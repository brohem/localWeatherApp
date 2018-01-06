function main(){

var lon;
var lat;
var api = 'https://fcc-weather-api.glitch.me/api/current?'

var date = new Date(); //set the current date
var month = date.getMonth(); // set the current month

// collection of background images for the switch below
var winterImageUrl = './resources/img/winter.jpg';
var springImageUrl = './resources/img/spring.jpg';
var summerImageUrl = './resources/img/summer.jpg';
var autumnImageUrl = './resources/img/autumn.jpg';


// swith the background image according to the current month
  switch(month){

    case 11:
      $('.backgroundImage').css( 'background-image', 'url('+ winterImageUrl +')' );
      break;

    case 0:
      $('.backgroundImage').css( 'background-image', 'url('+ winterImageUrl +')' );
      break;

    case 1:
      $('.backgroundImage').css( 'background-image', 'url('+ winterImageUrl +')' );
      break;

    case 2:
      $('.backgroundImage').css( 'background-image', 'url('+ springImageUrl +')' );
      break;

    case 3:
      $('.backgroundImage').css( 'background-image', 'url('+ springImageUrl +')' );
      break;

    case 4:
      $('.backgroundImage').css( 'background-image', 'url('+ springImageUrl +')' );
      break;

    case 5:
      $('.backgroundImage').css( 'background-image', 'url('+ summerImageUrl +')' );
      break;

    case 6:
      $('.backgroundImage').css( 'background-image', 'url('+ summerImageUrl +')' );
      break;

    case 7:
      $('.backgroundImage').css( 'background-image', 'url('+ summerImageUrl +')' );
      break;

    case 8:
      $('.backgroundImage').css( 'background-image', 'url('+ autumnImageUrl +')' );
      break;

    case 9:
      $('.backgroundImage').css( 'background-image', 'url('+ autumnImageUrl +')' );
      break;

    case 10:
      $('.backgroundImage').css( 'background-image', 'url('+ autumnImageUrl +')' );
      break;

  }// END switch

  // get user location and execute weather display function
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){

        lat = 'lat='+position.coords.latitude;
        lon = 'lon='+position.coords.longitude;

        displayWeather(lat,lon);
      });

  } else {
      $('.temp-row').remove('temprature').html('<p class=qoute>Geolocation is not supported by this browser.</p>');
  }

  // convert celsius to fahrenheit and vise versa functions
  function cToF(celsius)
  {
    var cTemp = celsius;
    var cToFahr = cTemp * 9 / 5 + 32;
    var message = cTemp+'\xB0C is ' + cToFahr + ' \xB0F.';//for testing only
      console.log(message);//for testing only

      return cToFahr;
  }

  function fToC(fahrenheit)
  {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;

    var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';//for testing only
      console.log(message);//for testing only

      return fToCel;
  }
  //END convert celsius to fahrenheit and vise versa functions //



  // MAIN function - displays weather info from the API
  function displayWeather(lat,lon){

    var currentUrl = api+lat+'&'+lon;

    $.ajax({
       url:  currentUrl,
      // url: 'https://freegeoip.net/json/' // alternative url API (NOT USED - future growth)
       datatype: 'jsonp',

       success: function(data) {

         console.log(data);
         var celsiusTemprature = data.main.temp
         var fahrenheitTemprature = cToF(celsiusTemprature);
         var $weatherDescription = data.weather[0].description;

         $('#location').append(data.name + '<br>' + data.sys.country);
         $('#weatherIcon').append('<img src='+ data.weather[0].icon + ' alt=' +"'" +$weatherDescription+"'" +'>' );

         $('#temprature').append(data.main.temp+ '\xB0C ');
         $('#weatherDescription').append($weatherDescription.toUpperCase());

         //  show Farenheit function upon click showFarenheit button
         $('#showFarenheit').click(function(){
           $('#temprature').replaceWith( '<span id="temprature">' + fahrenheitTemprature + ' \xB0F' + '</span>' );
         });

         //  show Celsius function upon click showCelsius button
         $('#showCelsius').click(function(){
           $('#temprature').replaceWith( '<span id="temprature">' + celsiusTemprature +' \xB0C' + '</span>' );
         });

       }// END success: function(data)

     }); // END ajax GET

 }// END displayWeather


};//END main function


$(document).ready(main);
