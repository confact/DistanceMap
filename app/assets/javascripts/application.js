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
//= require_tree .
$(function() {
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
    $( "#current" )
      .html( "Calculating Time.."); 
    $.get( "/ajax", { start: "51.519952,-0.098424", end: evt.latLng.lat().toFixed(6)+","+evt.latLng.lng().toFixed(6), time: "2014-11-06T19:00:02-0500" }, function( data ) {
      if(data.hasOwnProperty('travel_time_minutes')) {
        $( "#current" )
          .html( "Minutes it will take: "+data.travel_time_minutes ); // John
      }
    else {
      $( "#current" )
        .html( data.error_message );
    }}, "json" );
      //document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
  });

  google.maps.event.addListener(positionMarker, 'dragstart', function (evt) {
      document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
  });

  google.maps.event.addListener(rentifyMarker, 'click', function() {
        rentifyInfowindow.open(map, this);
  });

  map.setCenter(rentifyMarker.position);
});
