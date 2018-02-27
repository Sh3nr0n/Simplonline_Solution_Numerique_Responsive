$(document).ready(function(){

//Declare the local time in french : use of the "fr" argument to display the date with in local french time , use of "LL" argument to format the date with the french formalism

var date = moment().locale("fr").format("LL");
console.log("date =",date);

var cityName = "Pamiers";
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
        url:"http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&APPID=6aaaa1781b8c3529a2b54e3ca4c046db",
        type:"GET",
        datatype:"jsonp",
        success: function(data){

            var temp = data.main.temp;
            var minTemp = data.main.temp_min;
            var maxTemp = data.main.temp_max;
            var humid = data.main.humidity;
            var press = data.main.pressure;
            var wind = data.wind.speed;
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            //Add the values in the html

            $("#temp").text(temp+"°");
            $("#tempMax").text("Temp max : "+maxTemp+"°C");
            $("#tempMin").text("Temp min : "+minTemp).append("°C");
            $("#pressure").text("Pression : "+press+" Pa");
            $("#windSpeed").text("Vitesse du vent : "+wind+" km/h");
            $("#humidity").text("Humididté : "+humid+"%");
            $("#longitude").text("Longitude : "+lon+"°");
            $("#latitude").text("Latitude : "+lat+"°");
            $("#weatherMap").html("<iframe  src='https://www.google.com/maps/embed/v1/place?key= AIzaSyALxcUHJrXCap55BTBf8LRXBB2k0Xe8HeI&q="+lat+","+lon+"&zoom=12&maptype=satellite' frameborder='0' allowfullscreen></iframe>");
        }
    });
};


//Add the date to the html
$('#dateJour').html(date);

$("#validate").on( "click", function() {
    $("#errorMsg").empty();

    var cityName = $("#cityName").val();

    //Verify that the field is not empty before sending the data
    if ($("#cityName").val() != ""){

        weatherVar(cityName);

    } else {
        $("#errorMsg").text("Merci de remplir le champ ville");
    }
});
});