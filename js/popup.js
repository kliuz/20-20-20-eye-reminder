document.addEventListener('DOMContentLoaded', function() {
  let isToggled = false;
  $('.toggle').click(function() {
    $(this).find('.btn').toggleClass('btn-primary active btn-light');
    chrome.runtime.sendMessage({"toggleOn": isToggled});
    isToggled = !isToggled;
  });
});

