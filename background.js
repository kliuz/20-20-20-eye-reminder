chrome.runtime.onInstalled.addListener(function() {
  alert("Hi, you updated the extension!");
  // chrome.alarms.create("testAlarm", {delayInMinutes: 1, periodInMinutes: 1});
});

chrome.commands.getAll(function(commands) {
  console.log(commands);
})

chrome.commands.onCommand.addListener(function(command) {
  console.log('hi: ', command);
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

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   alert("Beep!");
// });