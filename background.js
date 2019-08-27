chrome.runtime.onInstalled.addListener(function() {
  alert("Hi, you updated the extension!");
  chrome.alarms.create("breakAlarm", {delayInMinutes: 1, periodInMinutes: 1});
});

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
  if (request.toggleOn) {
    chrome.alarms.create("breakAlarm", {delayInMinutes: 1, periodInMinutes: 1});
  } else {
    chrome.alarms.clear("breakAlarm");
  }
})

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked browser action"});
//   })
// });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(request.message);
//   if (request.message === "open new tab") {
//     chrome.tabs.create({"url": request.url});
//   }
// });

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(alarm);
  if (alarm.name === "breakAlarm") {
    chrome.tabs.create({active: true, url: "eyetab.html"});
  }
});