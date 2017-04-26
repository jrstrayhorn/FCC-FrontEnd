$(document).ready(function() {
    $("#Fdeg-button").click(function () {
        var temp = $("#temp").attr("data-temp");
        var fTemp = ConvertToFahrenheit(temp);
        $("#temp").text(fTemp + " \xB0 F");
    });

    $("#Cdeg-button").click(function() {
        var temp = $("#temp").attr("data-temp");
        var cTemp = ConvertToCelsius(temp);
        $("#temp").text(cTemp + " \xB0 C");
    });

/*
    var response = {
        "coord":{"lon":139,"lat":35},
        "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
        "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
        "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
        "wind":{"speed":7.31,"deg":187.002},
        "rain":{"3h":0},
        "clouds":{"all":92},
        "dt":1369824698,
        "id":1851632,
        "name":"Shuzenji",
        "cod":200
    };*/
    
    $.get("http://ipinfo.io?token=23633d0f168caf", function(response) {
        var latLongString = response.loc;
        var latLongArray = latLongString.split(',');
        var lat = latLongArray[0];
        var long = latLongArray[1];

        $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=224b7da19b9e9c30983d4c504b9c491e", function(response) {
            
            var img = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
            $("#weather-image").attr("src", img);

            var desc = response.weather[0].description;
            $(".weather-desc").text(capitalizeFirstLetter(desc));
            
            var temp = response.main.temp;
            $("#temp").attr("data-temp", temp);
            var fTemp = ConvertToFahrenheit(temp);
            $("#temp").text(fTemp + " \xB0 F");

        }, "jsonp");
    }, "jsonp");
});

function ConvertToFahrenheit(temp) {
    return ((1.8 * (temp - 273))  + 32) | 0;
}

function ConvertToCelsius(temp) {
    return (temp - 273.15) | 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}