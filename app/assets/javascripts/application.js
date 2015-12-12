// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require semantic-ui
//= require picker/picker.js
//= require picker/picker.date.js
//= require picker/picker.time.js
//= require_tree .
$(function() {
  function addMinutes(date, minutes) {
    console.log(date.getTime());
    console.log(minutes);
    return new Date(date.getTime() + minutes*60000);
  }

  function pmamTo24(time)
  {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    console.log(sHours + ":" + sMinutes);
    return sHours + ":" + sMinutes;
  }

  //just helper to pick a data and time
  $('#datepicker').pickadate();
  $('#timepicker').pickatime();

  var path = new google.maps.MVCArray();
  var service = new google.maps.DirectionsService(), poly;
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 9,
      center: new google.maps.LatLng(51.519952, -0.098424),
      mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var rentifyMarker = new google.maps.Marker({
      position: new google.maps.LatLng(51.519952,-0.098424),
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      map: map
  });

  var positionMarker = new google.maps.Marker({
      position: new google.maps.LatLng(51.442,-0.288),
      draggable: true,
      map: map
  });

  var rentifyInfowindow = new google.maps.InfoWindow({
      content: "Rentify's office"
  });

  google.maps.event.addListener(positionMarker, 'dragend', function (evt) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(rentifyMarker.getPosition());
    bounds.extend(evt.latLng);
    map.fitBounds(bounds);
    $( "#current" ).html( "Calculating Time..");
    //create datetime
    var date = document.getElementById("datepicker").value,
        time = document.getElementById("timepicker").value
    var datetime = new Date(date + " " + pmamTo24(time));
    //calls the ajax in home_controller
    $.get( "/ajax", { start: "51.519952,-0.098424", end: evt.latLng.lat().toFixed(6)+","+evt.latLng.lng().toFixed(6), timedate: datetime.toISOString() }, function( data ) {
      if(data.hasOwnProperty('travel_time_minutes')) {
        $( "#current" )
          .html( "You will be arriving: "+addMinutes(datetime,data.travel_time_minutes).toString() ); // John
      }
    else {
      $( "#current" ).html( data.error_message );
    }}, "json" );
  });

  google.maps.event.addListener(positionMarker, 'dragstart', function (evt) {
    $( "#current" )
      .html( '<p>Currently dragging marker...</p>');
  });

  google.maps.event.addListener(rentifyMarker, 'click', function() {
        rentifyInfowindow.open(map, this);
  });

  map.setCenter(rentifyMarker.position);
});
