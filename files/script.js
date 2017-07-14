$(document).ready(function() {
  // to do:
  // reverse geocode lat-lon to get update city div
  // style & make responsive

  //#########################################//
  //####    Function definitions     #######//
  //#########################################//
  // getPosition(), getData(), updateDOM()

  // global var to store json data from the API
  var data, temp, coordinates;
/////////////////////////////////////////////////////////////////////////////
  // query user's lat-lon coordinates & pass values to getData function
  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getData);
    }
    else {
      $(".text").html("Sorry, geolocation isn't supported by this browser");
    }
  }
//////////////////////////////////////////////////////////////////////////////
  // callback function for getPosition(success)
  // adds lat-lon coordinates to API query & gets data

  function getData(position) {
    coordinates = (position.coords.latitude).toString() + "," + (position.coords.longitude).toString();
    var baseURI = "https://api.darksky.net/forecast/d74ae61790a99390027e3f6d5d3ddc83/";
    var urlStr = baseURI + coordinates;
    // gets data, updates global 'data' var, runs update() function (manipulates DOM)
    $.get(urlStr, function(data) {
      data = data;
      if (data.currently) {updateDOM(data);}
      // if (data.currently.icon) {selectIcon(data);}
    }, "jsonp");
  }
/////////////////////////////////////////////////////////////////////////////

  // DOM manipulations
  function updateDOM(data) {
    temp = Math.round(data.currently.temperature);
    weatherType = (data.currently.icon);
    $(".icon").addClass(selectIcon(weatherType)); // icon
    $(".temp").html(temp + '&deg;'); // temperature
    $(".desc").prepend("Currently " + data.currently.summary); // summary
    getCity(); // reverse geocodes lat-lon & returns updates #city
  }
/////////////////////////////////////////////////////////////////////////////////
// GET CITY FROM REVERSE GEOCODE OF LAT-LON COORDINATES
function getCity() {
  var city;
  baseURI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  key = "&key=AIzaSyDfbMGzRHXDFAkgOworfh33Jadfi1lXW2I";
  url = baseURI + coordinates + key;
  $.get(url, function(data) {
    $("#city").html(data.results[0].address_components[3].long_name);
  });
}
///////////////////////////////////////////////////////////////////////////
// updates background image & icon based on current weather
  function selectIcon(weatherType) {
    // this var adds 'opacity' to backgrd w/o affecting other elements
    var bkgrdOverlay = "linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.6)), ";
      switch (weatherType) {
        case "clear-day":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://kanal5.com.mk/uploads/soncevo-21-.jpg')" );
          return "wi wi-day-sunny";
          break;
        case "clear-night":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('https://cdn.davemorrowphotography.com/wp-content/uploads/2016/07/lightroom-photoshop-tutorials-nightphotography.jpg')" );
          return "wi wi-night-clear";
          break;
        case "rain":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://www.118italia.net/wp-content/uploads/2016/02/double-vitrage.jpg')" );
          return "wi wi-rain";
          break;
        case "snow":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://i2.cdn.cnn.com/cnnnext/dam/assets/120206121110-burgos-winter-snap-horizontal-large-gallery.jpg')" );
          return "wi wi-snow";
          break;
        case "sleet":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('https://icons.wxug.com/data/wximagenew/t/TaylorTot/209.jpg')" );
          return "wi wi-sleet";
          break;
        case "wind":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://wmbf.images.worldnow.com/images/22523638_BG1.jpg')" );
          return "wi wi-cloudy-gusts";
          break;
        case "fog":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://static.tumblr.com/a636cba4cf6b086fe0c30d6a622a3c32/ksn8c6y/Kj0mi2wui/tumblr_static_trees_and_fog.jpg')" );
          return "wi wi-fog";
          break;
        case "cloudy":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://www.gazetteseries.co.uk/resources/images/5360796.jpg?display=1&htype=0&type=responsive-gallery')" );
          return "wi wi-cloudy";
          break;
        case "partly-cloudy-day":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('https://cloudysky.files.wordpress.com/2007/01/cloudsinegypt.jpg')" );
          return "wi wi-day-cloudy";
          break;
        case "partly-cloudy-night":
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/ggZAv9L/half-moon-on-a-cloudy-night_4jrzmfff__M0000.jpg')" );
          return "wi wi-night-alt-cloudy";
          break;
        default:
          $("#bkgrd").css("background-image", bkgrdOverlay + "url('http://www.stevespanglerscience.com/blog/wp-content/uploads/2013/04/Clouds-ScienceBehind-Lake.jpg')" );
          return "wi wi-cloud";
      }
  }
  // TEMPERATURE CONVERSION
/////////////////////////////////////////////////////////////////////////
  // defaults to fahrenheit
  $("#fahr").css("background-color", "#708aac");
  // on toggle converts to celsius & updates DOM
  $("#celsius").click(function() {
    $("#celsius").css("background-color", "#708aac");
    $("#fahr").css("background-color", "#bed1f3");
    $(".temp").html(toCelsius(temp) + '&deg;');
  });

  $("#fahr").click(function() {
    $("#fahr").css("background-color", "#708aac");
    $("#celsius").css("background-color", "#bed1f3");
    $(".temp").html(temp + '&deg;');
  })

  function toCelsius(temp) {
    return Math.round((temp - 32) * (5/9));
  }
  ////////////////////////////////////////////////////////////////////

  getPosition();

}); // document.ready close
