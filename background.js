chrome.runtime.onInstalled.addListener(function() {
  alert("Hi, you updated the extension!");
  chrome.storage.sync.remove("toggleState", function() {
    const error = chrome.runtime.lastError;
    if (error) {
      console.log(error);
    }
  });
  chrome.alarms.create("breakAlarm", {periodInMinutes: 20});

  chrome.storage.sync.set({"totalReminders": 0, "obeyedReminders": 0});
});

function createDestroyAlarm() {
  chrome.storage.sync.get({"toggleState": true}, state => {
    console.log(state.toggleState);
    if (state.toggleState) {
      chrome.alarms.create("breakAlarm", {periodInMinutes: 20});
    } else {
      chrome.alarms.clear("breakAlarm");
    }
    console.log("state: ", state.toggleState);
    chrome.alarms.getAll(function(alarms) {
      console.log(alarms);
    });
  });
}

chrome.runtime.onStartup.addListener(createDestroyAlarm);

chrome.commands.onCommand.addListener(function(command) {
  if (command === "duplicate-tab") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currId = tabs[0].id;
      if (currId) {
        chrome.tabs.duplicate(currId);
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleChanged) {
    createDestroyAlarm();
  }

  if (request.rested) {
    // todo: do something and keep track
    chrome.storage.sync.get(["obeyedReminders"], function(reminder) {
      chrome.storage.sync.set({"obeyedReminders": reminder.obeyedReminders+1});
    });
  }
  chrome.storage.sync.get(null, function(items) {
    console.log(items);
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "breakAlarm") {
    chrome.tabs.create({active: true, url: "eyetab.html"});
    chrome.storage.sync.get(["totalReminders"], function(reminder) {
      chrome.storage.sync.set({"totalReminders": reminder.totalReminders+1});
    });
  }
  chrome.storage.sync.get(null, function(items) {
    console.log(items);
  });
});