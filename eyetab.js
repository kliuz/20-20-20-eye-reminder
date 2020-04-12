function revealButton() {
  let btn = document.createElement("BUTTON");
  btn.classList.add("btn", "btn-primary");
  btn.innerHTML = "I've rested my eyes!";
  btn.addEventListener("click", function() {
    btn.parentNode.removeChild(btn);
    chrome.runtime.sendMessage({"rested": true});
    window.close();
  });
  document.getElementById("btnLoc").appendChild(btn);

  let closePageTimer = 240;
  setInterval(function() {
    if (closePageTimer === 0) {
      window.close();
    }
    closePageTimer--;
  }, 1000)
}

let showButtonTimer = 20;
const countdown = setInterval(function() {
  if (showButtonTimer === 0) {
    let timer = document.getElementById("timer")
    timer.parentNode.removeChild(timer);
    clearInterval(countdown);
    revealButton();
    return;
  }
  document.getElementById("timer").innerHTML = showButtonTimer;
  showButtonTimer--;
}, 1000);

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