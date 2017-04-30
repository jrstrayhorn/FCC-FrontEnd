
var Services = function () {
    var getCurrentLocation = function (done) {
        $.get("http://ipinfo.io?token=23633d0f168caf", done, "jsonp");
    };

    var getWeather = function (lat, long, done) {
        $.get("http://api.openweathermap.org/data/2.5/weather?" + 
                "lat=" + lat + 
                "&lon=" + long + 
                "&APPID=224b7da19b9e9c30983d4c504b9c491e", 
                done, 
                "jsonp");
    };

    return {
        getCurrentLocation: getCurrentLocation,
        getWeather: getWeather
    }
}();

var WeatherApp = function(services) {

    var init = function () {
        $("#Fdeg-button").click(showFahrenheit);
        $("#Cdeg-button").click(showCelsius);
        loadWeather();
    };

    var showFahrenheit = function () {
        $("#temp-display").text(convertToFahrenheit($("#temp-display").attr("data-temp")) + " \xB0 F");
    };

    var showCelsius = function() {
        $("#temp-display").text(convertToCelsius($("#temp-display").attr("data-temp")) + " \xB0 C");
    };

    var loadWeather = function () {
         services.getCurrentLocation(locationDone);
    };

    var locationDone = function(response) {
        var latLongArray = response.loc.split(',');
        services.getWeather(latLongArray[0], latLongArray[1], weatherDone);
    };

    var weatherDone = function(response) {      
        $("#weather-image").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        $(".weather-desc").text(capitalizeFirstLetter(response.weather[0].description));   
        $("#temp-display").attr("data-temp", response.main.temp);
        showFahrenheit();
    };

    var convertToFahrenheit = function (temp) {
        return ((1.8 * (temp - 273))  + 32) | 0;
    };

    var convertToCelsius = function (temp) {
        return (temp - 273.15) | 0;
    };

    var capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
        init: init
    }
}(Services);

$(document).ready(function() {
    WeatherApp.init();  
});

