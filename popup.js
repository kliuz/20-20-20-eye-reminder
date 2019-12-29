document.addEventListener("DOMContentLoaded", function() {
  // todo: fix this flickering
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

chrome.storage.sync.get(["obeyedReminders", "totalReminders"], function(items) {
  const obeyedReminders = items.obeyedReminders;
  const totalReminders = items.totalReminders;

  new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
      labels: ["Rested", "Ignored"],
      datasets: [{
        backgroundColor: ["#3e95cd", "#c45850"],
        data: [obeyedReminders, totalReminders-obeyedReminders]
      }]
    },
  });
});
