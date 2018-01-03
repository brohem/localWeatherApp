function main(){

var lon;
var lat;
var api = 'https://fcc-weather-api.glitch.me/api/current?'

var date = new Date();
var month = date.getMonth();

var winterImageUrl = './resources/img/winter.jpg';
var springImageUrl = './resources/img/spring.jpg';
var summerImageUrl = './resources/img/summer.jpg';
var autumnImageUrl = './resources/img/autumn.jpg';



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



  }





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
    var message = cTemp+'\xB0C is ' + cToFahr + ' \xB0F.';
      console.log(message);
      return cToFahr;
  }

  function fToC(fahrenheit)
  {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
      console.log(message);
      return fToCel;
  }
  //END convert celsius to fahrenheit and vise versa functions //




  function displayWeather(lat,lon){

    var currentUrl = api+lat+'&'+lon;

    $.ajax({
       url:  currentUrl,
      // url: 'https://freegeoip.net/json/' // alt url
       datatype: 'jsonp',

       success: function(data) {

         console.log(data);
         var celsiusTemprature = data.main.temp
         var fahrenheitTemprature = cToF(celsiusTemprature);

         $('#location').append(data.name + '<br>' + data.sys.country);
         $('#weatherIcon').append('<img src='+ data.weather[0].icon + ' alt=' + data.weather[0].description+'>' );
         $('#temprature').append(data.main.temp+ '\xB0C ');

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


