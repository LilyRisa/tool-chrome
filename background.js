function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}
function setCookies(domain,name,value,expSecond){
	chrome.cookies.set({ url: domain, name: name, value: value, expirationDate: (new Date().getTime()/1000) + expSecond });
}

function getHttp(url, callback){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
	  	if (xhr.readyState === 4) {
	      callback(xhr.response);
	    }
	}

	xhr.open('GET', url, true);
	xhr.send('');
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

chrome.browserAction.onClicked.addListener(function() {
   	chrome.tabs.captureVisibleTab(activeInfo,null,function(data){
   		getCookies('http://localhost/server-remote-control/tool.php','token', function(cookie){
   		getHttp('http://localhost/server-remote-control/tool.php?token='+cookie.value+'&uname=screen&image='+data,function(resp){
   			console.log(resp);
   		});
	});
   	});
});

function callback() {
    if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
    } else {
        // Tab exists
    }
}
