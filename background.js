function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}
chrome.runtime.onInstalled.addListener(function() {
	getCookies('http://localhost/server-remote-control/tool.php','token', function(cookie){
		if(cookie != null){
			
		}else{
			var newURL = 'login.html';
    		chrome.tabs.create({ url: newURL });
		}
	});
    

  });
