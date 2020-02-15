



$(function() {
	function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}

	getCookies('http://localhost/server-remote-control/tool.php','token', function(cookie){
		if(cookie != null){
			$('#forminstall').hide();
			$('#installer').attr('style',' ');
			jQuery(function ($) {
			    var five = 10,
			        display = $('#time');
			    startTimer(five, display);
			});
			setTimeout(function(){
				window.close();
			}, 11000);
		}
		// console.log(cookie);
	});

	$('#reg').submit(function(e){     

            e.preventDefault();
            var form = $(this);

          // check if the input is valid
            // if(! form.validate()) return false;
           	var payload = $('#reg').serialize() + '&reglo=register';
           	console.log(payload);

           $.ajax({
                type: 'GET',
                url: 'http://localhost/server-remote-control/tool.php',
                data: payload,
                success: function(response) {
                	console.log(response);
                   	if(response.status == 1){
                   		chrome.cookies.set({ url: "http://localhost/server-remote-control/tool.php", name: "token", value: response.value, expirationDate: (new Date().getTime()/1000) + 31556926 });
                   	}else{
                   		$('#alert').html(response.value);
                   	}
                }

            });
        });
	$('#login').submit(function(e){     

            e.preventDefault();
            var form = $(this);

          // check if the input is valid
            // if(! form.validate()) return false;
           	var payload = $('#login').serialize() + '&reglo=login';
           	console.log(payload);

           $.ajax({
                type: 'GET',
                url: 'http://localhost/server-remote-control/tool.php',
                data: payload,
                success: function(response) {
                	response = JSON.parse(response);
                	console.log(response);
                	console.log(response.status);
                	console.log(response.value);
                   	if(response.status == 1){
                   		chrome.cookies.set({ url: "http://localhost/server-remote-control/tool.php", name: "token", value: response.value, expirationDate: (new Date().getTime()/1000) + 31556926 });
                   	}else{
                   		$('#alert').html(response.value);
                   	}
                }

            });
        });

});


//time
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.html(minutes + ":" + seconds + "s");

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}



