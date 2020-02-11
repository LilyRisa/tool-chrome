chrome.runtime.onInstalled.addListener(function() {
    var newURL = 'login.html';
    chrome.tabs.create({ url: newURL });
  });
