var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "comster404", "esl_csgo", "mattmelvin", "ihazgamezz", "pokelawls", "wexsuvslim", "brunofin", "mattoblivium", "xvu1tur3x"];
var resultsField = $(".results-field");

$(document).ready(function() {
  $.each(streamers, function(i) {
    var channelName = streamers[i];
    checkStream(channelName);
  });
});

function checkStream(channel) {
  $.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?callback=?', function(data) {
    if (data.error) {
      resultsField.append("<div class='result-wrap missing col-xs-12 col-sm-4'><div class='result'><div class='logo-container'><img class='channel-logo' src='http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png'><h2 class='channel-name'>" + channel + "</h2></div><div class='result-text'><p class='current-game'>Account unavailable</p></div></div></div>");
    } else if (data.stream) {
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
    var channel = "https://twitch.tv/" + profile + "/profile";
    var name = data.display_name;
    if (data.status !== null) {
      var status = data.status;
    } else {
      var status = "";
    }
    if (data.logo !== null) {
      var logo = data.logo;
    } else {
        var logo = "http://www-cdn.jtvnw.net/images/xarth/404_user_50x50.png"
    }
    displayOffline(channel, name, status, logo);
  });
}

function displayOffline(channel, name, status, logo) {
  resultsField.append("<div class='result-wrap offline col-xs-12 col-sm-4'><div class='result'><div class='logo-container'><a href='" + channel + "' target='_blank'><img class='channel-logo' src='" + logo + "'><h2 class='channel-name'>" + name + "</h2></a></div><div class='result-text'><p class='current-game'>Offline</p><p class='status'>" + status + "</p></div></div></div>");
}

function displayStream(name, logo, stream, url, status) {
  resultsField.prepend("<div class='result-wrap online col-xs-12 col-sm-4'><div class='result'><div class='logo-container'><a href='" + url + "/profile' target='_blank'><img class='channel-logo' src='" + logo + "'><h2 class='channel-name'>" + name + "</h2></a></div><div class='result-text'><p class='current-game'><a href='" + url + "' class='page-link' target='_blank'>" + stream + "</a></p><p class='status'>" + status + "</p><div></div></div>");
}

$('#filter-all').on('click', function() {
  $('.result-wrap').removeClass('hidden');
});
$('#filter-online').on('click', function() {
  $('.offline').addClass('hidden');
  if ($('.online').hasClass('hidden')) {
    $('.online').removeClass('hidden');
  };
  $('.missing').addClass('hidden');
});
$('#filter-offline').on('click', function() {
  $('.online').addClass('hidden');
  if ($('.offline').hasClass('hidden')) {
    $('.offline').removeClass('hidden');
  }
  $('.missing').addClass('hidden');
});