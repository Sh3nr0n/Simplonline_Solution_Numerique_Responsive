$(document).ready(function(){

//Déclaration de la locale "fr" pour afficher la date en francais, au format francais avec "LL"

var date = moment().locale("fr").format("LL");
console.log("date =",date);

$('#dateJour').html(date);

});