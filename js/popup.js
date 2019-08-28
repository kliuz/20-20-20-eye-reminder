document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get({"toggleState": true}, state => {
    chrome.storage.sync.set({"toggleState": state.toggleState});
    if (!state.toggleState) {
      $(this).find(".btn").toggleClass("btn-primary active btn-light");
    }
  });

  $(".toggle").click(function() {
    $(this).find(".btn").toggleClass("btn-primary active btn-light");
    chrome.storage.sync.get({"toggleState": true}, function(state) {
      let currToggle = !state.toggleState;
      chrome.storage.sync.set({"toggleState": currToggle});
      chrome.runtime.sendMessage({"toggleChanged": true});
    });
  });
});

