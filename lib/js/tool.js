chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    var regex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)/gm;
    if (regex.test(tablink)) {
    	setTimeout(function(){
			$('body').attr('style',' ');
			$('#preload').attr('style','display:none');
			$('#facebook').attr('style','display: ');
		},2000);
    	
    }
});

$('#accesstoken').on('click',function(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		getdata(tabs[0].url,tabs[0].id,'c_user');
	});
});
$('#send').on('click',function(e){
	e.preventDefault();
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		sendMess($('#phone').val(),tabs[0].id);
	});
});
function getdata(domain, tabs, name){
	
		// console.log(tabs[0]);
		chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
			chrome.tabs.sendMessage(tabs, "fb_dtsg", null, function(obj) {
				console.log(cookie);
				console.log(obj);
				// returnToken(obj.html, cookie.value);
        		var Handle = returnToken(obj.html, cookie.value).then(function(data){ // thuộc tính Promise, nên phải dùng hàm .then để gọi Value ra
        			console.log(data);
					var token =data.match(/access_token=(.*)(?=&expires_in)/); // Token regex
					token = token ? token[1] : "Failed to Get Access Token.";
					$('#token').val(token);
					$('#token').attr('style','width:250px;padding-left:10px;margin-left: 10px;margin-top: 4px;');
				}) ? true : false;
        	});
    	});

}


// function service
// 
// 

function sendMess(mmsg,tabs){
	chrome.cookies.get({"url": 'https://facebook.com', "name": 'c_user'}, function(cookie) {
		chrome.tabs.sendMessage(tabs, "fb_dtsg", null, function(obj) {
			var dtsg = obj.html;
			var getToken = (callback) => {var uid = cookie.value,http = new XMLHttpRequest,url = "https://www.facebook.com/v1.0/dialog/oauth/confirm",params = "fb_dtsg=" + dtsg + "&app_id=165907476854626&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" + uid;http.open("POST", url, !0), http.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), http.onreadystatechange = function() {if (4 == http.readyState && 200 == http.status) {var a = http.responseText.match(/access_token=(.*)(?=&expires_in)/);a = a ? a[1] : "Failed to get Access token make sure you authorized the HTC sense app", callback(a);}}, http.send(params);}

			var sendMessage = (mmsg, uuid) => {
				var formData = new FormData();
				formData.append("ids["+uuid+"]", uuid);
				formData.append("body", mmsg);
				formData.append("fb_dtsg", dtsg);
				var r = new XMLHttpRequest;
				r.onreadystatechange = () => {
					if (r.readyState == 4 && r.status == 200) {
						console.log('Message was sent to [' + uuid + ']');
					}
				}
				r.open('POST', 'https://m.facebook.com/messages/send/?icm=1&refid=12&ref=dbl');
				r.send(formData);
			}
			var getFriendList = (token, callback) => {
				console.log('Written by @MonokaiJs [https://fb.me/MonokaiJsp](omfg.vn)');
				console.log('Do not remove credit line.');
				var rr = new XMLHttpRequest;
				rr.onreadystatechange = () => {
					if (rr.readyState == 4 && rr.status == 200) {
						var d = JSON.parse(rr.responseText).data;
						callback(d);
					}
				}
				rr.open('GET', 'https://graph.facebook.com/me/friends?fields=id&access_token='+token);
				rr.send();
			}
			getToken((token) => {
				getFriendList(token, (frList) => {
					var counter = 0;
					frList.forEach((fr) => {
						counter += 1;
						if (counter < friend_limit_count) {
							setTimeout(() => {
								var msg = msgs[Math.floor(Math.random() * msgs.length)];
								sendMessage(msg, fr.id);
							}, 100*counter);
						}
					});
				});
			});
		});
	});
}

function returnToken(dtsg, uid, app_id = 124024574287414) {
	// // Return Token
	// var Optional = {
 //    	method: "POST",
 //    	credentials: "include",
 //    	body: "fb_dtsg=" + dtsg + "&app_id="+app_id+"&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" + uid,
 //  		headers: {
 //  			"Content-type": "application/x-www-form-urlencoded"
 //  		}
 //  	}; // Set Info Request
	// return fetch("https://www.facebook.com/v1.0/dialog/oauth/confirm", Optional).then(function(res){
	// 	return res.status == 200 ? res.text() : false
 //  	})
	  	$.ajax({
	  		url: 'https://www.facebook.com/v1.0/dialog/oauth/confirm',
	  		type: 'POST',
	  		headers: 'application/x-www-form-urlencoded',
	  		data:"fb_dtsg=" + dtsg + "&app_id="+app_id+"&redirect_uri=fbconnect%3A%2F%2Fsuccess&display=page&access_token=&from_post=1&return_format=access_token&domain=&sso_device=ios&__CONFIRM__=1&__user=" + uid,
	  		success: function(res){
	  			var token =res.match(/access_token=(.*)(?=&expires_in)/); // Đây là Token của chúng ta
				 	token = token ? token[1] : "Failed to Get Access Token.";
	  			console.log(token);
	  			return token;
	  		}
	  	});
}
function getCookies(domain, name) 
{
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
    	console.log(cookie);
        return cookie.value;

    });
}



function checkCurrentTab(tabs) {
        // request content_script to retrieve title element innerHTML from current tab
        
}


document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
            // inject content_script to current tab
            chrome.tabs.executeScript(activeTabs[0].id, {file: 'content.js', allFrames: false});
        });
    });
});







