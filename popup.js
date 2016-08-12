document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    var currentLocaiton;
    var promise = $.getJSON("http://ipinfo.io");
    promise.done(function(data){
        currentLocaiton = data.city;
        var yql = 'select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+currentLocaiton+'%22)';
        var weatherYQL = 'https://query.yahooapis.com/v1/public/yql?q=' + yql + '&format=json';
        $.getJSON(weatherYQL, function(response){
            var categories = ["scattered thunderstorms", "rain", "thunderstorms", "scattered showers", "scattered snow showers", "snow showers"];
            var todayWeather = response.query.results.channel.item.forecast[0].text.toLowerCase();
            if($.inArray(todayWeather, categories) > -1) {
                window.alert('Remember to bring an umbrella!');
            } else {
                window.alert('It\'s fine, enjoy your day!');
            }
        });
    });
    promise.fail(function(err){
        console.log(err);
    });
  }, false);
}, false);
