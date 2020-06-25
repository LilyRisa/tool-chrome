



$(function() {
  var imp = {};
  chrome.cookies.get({"url": 'https://mangxahoi.club/api', "name": 'access_token'}, function(cookie) {
  if(cookie != null){
    $('#home').attr('style','display:none');
    $('#profile').attr('style','margin-left: 166px;');
    chrome.cookies.getAll({"url": 'https://mangxahoi.club'}, function(data) {
      data.forEach((value) => {
                            
          imp[value.name]= value.value;
          $('#zimg').attr('src',imp.user_picture);
          $('#user_name').html(`Name: ${imp.user_name}`);
          $('#user_id').html(`ID: ${imp.user_id}`);
          $('#user_birthday').html(`Birthday: ${imp.user_birthday}`);
          $('#access_token').val(imp.access_token);
          $('.zcontact').attr('href',`https://zalo.me/${imp.user_id}`);
        });
    });

  }
    
});
	$('#zalo_login').on('click',function(e){     
            var DataUser = {};
            e.preventDefault();

           $.ajax({
                type: 'GET',
                url: 'https://mangxahoi.club/api/index.php',
                success: function(response) {
                	response = JSON.parse(response);
                	console.log(response);
                      openlink(response.url_login);
                      setTimeout(checklogin(function(cookie){
                          cookie.forEach((value) => {
                            
                            DataUser[value.name]= value.value;

                          });
                          if(DataUser.access_token){
                            $('#home').attr('style','display:none');
                            $('#profile').attr('style','margin-left: 166px;');
                            $('#zimg').attr('src',DataUser.user_picture);
                            $('#user_name').html(`Name: ${DataUser.user_name}`);
                            $('#user_id').html(`ID: ${DataUser.user_id}`);
                            $('#user_birthday').html(`Birthday: ${DataUser.user_birthday}`);
                            $('#access_token').val(DataUser.access_token);
                            $('.zcontact').attr('href',`https://zalo.me/${DataUser.user_id}`);
                          }
                          
                      }),5000);
                	}

            });
        });

});

function openlink(url){
  window.open(url, 
     'newwindow', 
     'width=600,height=400'); 
return false;
}
function ajaclink(url){

}
function checklogin(callback){
  chrome.cookies.getAll({"url": 'https://mangxahoi.club'}, function(cookie) {
      console.log(cookie);
      callback(cookie);
  });
}



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



