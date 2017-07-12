$(document).ready(function() {
  // Access-Control-Allow-Origin: "https://api.darksky.net";
  // Access-Control-Allow-Credentials: true;
  //#########################################//
  //####    Function definitions     #######//
  //#########################################//
  // HTML5 query to the navigator??
  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionQuery);
    }
    else {
      $(".text").html("Sorry, geolocation isn't supported by this browser");
    }
  }

  // callback functions for getPosition(success, error)
  function positionQuery(position) {
    var baseURI = "https://api.darksky.net/forecast/d74ae61790a99390027e3f6d5d3ddc83/";
    var coordinates = (position.coords.latitude).toString() + "," + (position.coords.longitude).toString();
    var urlStr = baseURI + coordinates;
    // $(".text").html(urlStr);
    $.getJSON(urlStr, function(json) {
      $(".text").html(json.currently.icon);
    });

  }


  $("#position").click(function() {
    var url = getPosition();
    if (url) {
      console.log(url);
}
  })



}); // document.ready close
