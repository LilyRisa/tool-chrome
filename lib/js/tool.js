function getToken(user, pass) {

    var MD5 = function(d) { result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase() };

    function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f }

    function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0; for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ }

    function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ }

    function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m,
                t = f,
                g = r,
                e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) }

    function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) }

    function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) }

    function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) }

    function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) }

    function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) }

    function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m }

    function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
    var username = user; //Username, Email or ID
    var password = pass; // Account Password
    var d = {
        api_key: '3e7c78e35a76a9299309885393b02d97',
        email: username,
        format: 'JSON',
        locale: 'vi_VN',
        method: 'auth.login',
        password: password,
        return_ssl_resources: 0,
        v: '1.0'
    };
    var sig = "";
    var url = "https://api.facebook.com/restserver.php?";
    for (name in d) {
        sig += name + "=" + d[name];
        url += name + "=" + d[name] + "&";
    }
    sig += 'c1e620fa708a1d5696fb991c1bde5662';
    url += "sig=" + MD5(sig);
    return url;
}
//more
function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
var showChar = 60;  // 
    var ellipsestext = "...";
    var moretext = " Show more >";
    var lesstext = " Show less";
    

    $('.more').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
    //more
chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    var regex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)/gm;
    var yt = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\//gm;
    var video_yt=/^(http(s)?:\/\/)?((w){3}.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/gm;
    var ins = /^(http(s)?:\/\/)?((w){3}.)?instagram?(\.com)?\//gm;

    if (regex.test(tablink)) {
    	setTimeout(function(){
			$('body').attr('style',' ');
			$('#preload').attr('style','display:none');
			$('#facebook').attr('style','display: ');
		},2000);
    	
    }else if(yt.test(tablink)){
    	setTimeout(function(){
    		$('body').attr('style',' ');
			$('#preload').attr('style','display:none');
    		$("#ytube").attr('style', ' ');
    	},2500);
    	if (video_yt.test(tablink)) {
    		var title = tablink;
    		$("#yt-alert").attr('style', 'display : none');
    		$("#linkyt").attr('style', 'display : none');
    		$("#yt-load").html('<img src="../images/loading.gif" width="30" height="30" /> Đang Lấy Thông Tin video. Vui Lòng Đợi...').fadeIn("slow");
            var url_yt = 'https://mangxahoi.club/yt/index.php?url=' + tablink;
            $.ajax({
                url: url_yt,
                type: 'GET',
                success: function(result) {
                	response = JSON.parse(result);
                	console.log(response);
                	$("#yt-load").attr('style', 'display : none');
                    $("#linkyt").attr('style', ' ');
                	$("#ytresult").html(`<h6>Tên video: <a href="#" id="name_yt"> ${response.meta.title}</a></h6>
                					<img src="${response.thumb}" alt="" style="width: 135px;margin-left: 122px;" />
									<textarea class="form-control" style="width:400px; margin-top:10px;margin-bottom:10px;" rows="5">Tag: ${response.meta.tags}</textarea>
                		`);
                	$("#link").attr('href',response.url[0].url);
                	$("#size").html(bytesToSize(response.url[0].filesize));
                	if(response.converter != null){
                		$('#audioz').attr('style',' ');
                		$('#audiolink').attr('href',response.converter.mp4['720p'].stream[1].url);

                	}
                }
            });
    	}
    }else if (ins.test(tablink)) {
    	setTimeout(function(){
			$('body').attr('style',' ');
			$('#preload').attr('style','display:none');
			$('.ins').attr('style','display: ');
		},2000);
    }
});

$('#accesstoken').on('click',function(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		var pass = $('#passFB').val();
		getdata(tabs[0].url,'c_user',pass);
	});
});
$('#send').on('click',function(e){
	e.preventDefault();
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		sendMess($('#phone').val(),tabs[0].id);
	});
});
function getdata(domain, name, pass){
	
		// console.log(tabs[0]);
		chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
			console.log(cookie);
			var result = getToken(cookie.value, pass);
			console.log(result);
			$.ajax({
                url: result,
                type: "get",

                success: function(result) {
                    if (result.error_code == null) {
                        chrome.tabs.executeScript({
                            code: 'alert("'+result.access_token+'");'
                        });
                    } else {
                        chrome.tabs.executeScript({
                            code: 'alert("null");'
                        });
                    }
                }
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







