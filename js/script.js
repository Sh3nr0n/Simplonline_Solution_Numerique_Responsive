$(document).ready(function () {

    //Declare the local time in french : use of the "fr" argument to display the date with in local french time , use of "LL" argument to format the date with the french formalism
    
    var date = moment().locale("fr").format("LL");
    console.log("date =", date);

    var cityName = "Pamiers";
    weatherVar(cityName);

    //Add today's date into the html

    $('#dateJour').html(date);

    //Declare weather variables to store the actual values

    var minTemp;
    var maxTemp;
    var humid;
    var press;
    var wind;
    var lat;
    var long;

    function weatherVar(cityName) {

        //Call ajax method with jquery

        $.ajax({

            //Get the API URL and concatenate the actual city name into it

            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&APPID=6aaaa1781b8c3529a2b54e3ca4c046db",
            type: "GET",

            // Type of data that is expected back from the server (NB: "json" can be replaced by "jsonp" datatype)

            datatype: "json",

            //"success" is a function to be called if the request succeeds for which we store the result of the request, e.g. the content of the json, into an argument called  "data"

            success: function (data) {

                //For each of the declared variables we assign the value of the data we need to display, "data" is the object in which the data are stored, "main", "wind" and "coord" are the methods of this object and "temp", "humidity", "pressure" ... are the attributes of these methods

                var temp = data.main.temp;
                var minTemp = data.main.temp_min;
                var maxTemp = data.main.temp_max;
                var humid = data.main.humidity;
                var press = data.main.pressure;
                var wind = data.wind.speed;
                var lat = data.coord.lat;
                var lon = data.coord.lon;

                //Add the values in the html with the ".text()" function and concatenate with the value of the corresponding weather variables

                $("#temp").text(temp + "°");
                $("#tempMax").text("Temp max : " + maxTemp + "°C");
                $("#tempMin").text("Temp min : " + minTemp + "°C");
                $("#pressure").text("Pression : " + press + " Pa");
                $("#windSpeed").text("Vitesse du vent : " + wind + " km/h");
                $("#humidity").text("Humididté : " + humid + "%");
                $("#longitude").text("Longitude : " + lon + "°");
                $("#latitude").text("Latitude : " + lat + "°");

                //Display the map in the html with the google API using the actual coordinates of the user request. We use the "place" mode followed by the API key and the "q" (query) value of what we are searching for in gmaps e.g. the coordinates. The "zoom" level is defined on 12 and the "maptype" may be either "roadmap" or "satelite"

                $("#weatherMap").html("<iframe  src='https://www.google.com/maps/embed/v1/place?key=AIzaSyALxcUHJrXCap55BTBf8LRXBB2k0Xe8HeI&q=" + lat + "," + lon + "&zoom=12&maptype=satellite' frameborder='0'></iframe>");
            }
        });
    };

    $("#validate").on("click", function () {

        //Clean the error message in case it has already been displayed a first time
        $("#errorMsg").empty();

        var cityName = $("#cityName").val();

        //Verify that the field is not empty before sending the data to OWM
        if ($("#cityName").val() != "") {

            weatherVar(cityName);

        } else {

            $("#errorMsg").text("Merci de remplir le champ ville");
        }
    });
});