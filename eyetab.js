function revealButton() {
  let btn = document.createElement("BUTTON");
  btn.classList.add("btn", "btn-primary");
  btn.innerHTML = "Click here!";
  btn.addEventListener("click", function() {
    btn.parentNode.removeChild(btn);
    chrome.runtime.sendMessage({"rested": true})
  });
  document.getElementById("btnLoc").appendChild(btn);
}

let seconds = 20;
const countdown = setInterval(function() {
  if (seconds === 0) {
    let timer = document.getElementById("timer")
    timer.parentNode.removeChild(timer);
    clearInterval(countdown);
    revealButton();
    return;
  }
  document.getElementById("timer").innerHTML = seconds;
  seconds--;
}, 1000);