chrome.runtime.onInstalled.addListener(function() {
  alert("Hi, you updated the extension!");
  chrome.storage.sync.remove("toggleState", function() {
    const error = chrome.runtime.lastError;
    if (error) {
      console.log(error);
    }
  });
  chrome.alarms.create("breakAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.1});
});

function createDestroyAlarm() {
  chrome.storage.sync.get({"toggleState": true}, state =>  {
    console.log(state.toggleState);
    if (state.toggleState) {
      chrome.alarms.create("breakAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.1});
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
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(alarm);
  if (alarm.name === "breakAlarm") {
    chrome.tabs.create({active: true, url: "eyetab.html"});
  }
});