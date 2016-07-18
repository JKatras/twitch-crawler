var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "comster404", "esl_csgo", "mattmelvin", "ihazgamezz", "pokelawls", "wexsuvslim", "brunofin", "xvu1tur3x"];
var resultsField = $(".results-field");

$(document).ready(function() {
  $.each(streamers, function(i) {
    var channelName = streamers[i];
    checkStream(channelName);
  });
});

function checkStream(channel) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', function(data) {
    console.log(data);
   if(data.error){
      $('.results-field').append("<div class='result missing'><img class='channel-logo' src='http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png'><div class='result-text'><h2 class='channel-name'>"+ channel +"</h2><p class='current-game'>Account unavailable</p></div></div>");
   }else if (data.stream) {
      var name = data.stream.channel.display_name;
      var logo = data.stream.channel.logo;
      var stream = data.stream.game;
      var url = data.stream.channel.url;
      var status = data.stream.channel.status;
      displayStream(name, logo, stream, url, status);
    } else {
      getProfile(channel);
    }
  });
}

function getProfile(profile) {
  $.getJSON('https://api.twitch.tv/kraken/channels/' + profile, function(data) {
    var channel = "https://twitch.tv/"+profile+"/profile";
    var name = data.display_name;
    if(data.logo!== null){
      var logo = data.logo;
    }else{
      var logo = "http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png"
    }
    displayOffline(channel, name, logo);
  });
}

function displayOffline(channel, name, logo){
  //console.log(logo);
  $('.results-field').append("<div class='result offline'><img class='channel-logo' src='" + logo + "'><div class='result-text'><a href='" + channel + "' target='_blank'><h2 class='channel-name'>" + name + "</h2></a><p class='current-game'>Offline</p></div></div>");
}

function displayStream(name, logo, stream, url, status) {
  $('.results-field').append("<div class='result online'><img class='channel-logo' src='" + logo + "'><div class='result-text'><a href='" + url + "/profile' target='_blank'><h2 class='channel-name'>" + name + "</h2></a><p class='current-game'><a href='" + url + "' class='page-link' target='_blank'>" + stream + "</a></p><p class='status'>" + status + "</p><div></div>");   
}
$('#filter-all').on('click', function(){
  $('.result').removeClass('hidden');
});
$('#filter-online').on('click', function(){
  $('.offline').addClass('hidden');
  if($('.online').hasClass('hidden')){
     $('.online').removeClass('hidden');
  };
  $('.missing').addClass('hidden');
});
$('#filter-offline').on('click', function(){
  $('.online').addClass('hidden');
  if ($('.offline').hasClass('hidden')){
    $('.offline').removeClass('hidden');
  }
  $('.missing').addClass('hidden');
})