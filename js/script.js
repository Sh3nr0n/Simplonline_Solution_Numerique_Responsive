$(document).ready(function(){

//Declare the local time in french : use of the "fr" argument to display the date with in local french time , use of "LL" argument to format the date with the french formalism

var date = moment().locale("fr").format("LL");
console.log("date =",date);

var cityName = "Pamiers";
console.log("ville =", cityName);
weatherVar(cityName);



function weatherVar(cityName){
    
    var minTemp = ""; 
    var maxTemp = "";
    var humid = "";
    var press = "";
    var wind = "";
    var lat = "";
    var long ="";

    $.ajax({
        url:"http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric" + "&APPID=6aaaa1781b8c3529a2b54e3ca4c046db",
        type:"GET",
        datatype:"jsonp",
        success: function(data){
            //$("#tempMin").val() = data.main.humidity;
            var temp = data.main.temp;
            var minTemp = data.main.temp_min;
            var maxTemp = data.main.temp_max;
            var humid = data.main.humidity;
            var press = data.main.pressure;
            var wind = data.wind.speed;
            var lat = data.coord.lat;
            var lon = data.coord.lon;


            console.log("Temp :",temp);
            console.log("Temp max :",maxTemp);
            console.log("Temp min :",minTemp);
            console.log("Humidité :",humid);
            console.log("Pression atm :",press);
            console.log("vitesse vent :",wind);
            console.log("latitude :",lat);
            console.log("longitude :",lon);

            $("#temp").append(temp).append(" °");
            $("#tempMax").append("Temp max : ").append(maxTemp).append(" °C");
            $("#tempMin").append("Temp min : ").append(minTemp).append(" °C");
            $("#pressure").append("Pression : ").append(press).append(" Pa");
            $("#windSpeed").append("Vitesse du vent : ").append(wind).append(" km/h");
            $("#humidity").append("Humididté : ").append(humid).append(" %");
            $("#longitude").append("Longitude : ").append(lon).append(" °, ");
            $("#latitude").append("latitude : ").append(lat).append(" °");

        }
    });
};


//Add the date to the html
$('#dateJour').html(date);

$("#validate").on( "click", function() {

    var cityName = $("#cityName").val();

    //Verify that the field is not empty before sending the data
    if ($("#cityName") != ""){
        //Add a function to clean the previous "appends"
        $("container").empty();
        weatherVar(cityName);

    } else {
        $("#errorMsg").html("Merci de remplir le champ ville");
    }
});

//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=6aaaa1781b8c3529a2b54e3ca4c046db

//var cityName = "Pamiers";
//http://api.openweathermap.org/data/2.5/weather?q=cityName&APPID=6aaaa1781b8c3529a2b54e3ca4c046db&units=metric


});