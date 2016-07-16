var updateMapLocation = function(location) {
  var googlePos = new google.maps.LatLng(location.lat, location.lon);
  var mapOptions = {
    zoom : 13,
    center : googlePos,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };

  var mapObj = document.getElementById('map');
  var googleMap = new google.maps.Map(mapObj, mapOptions);
  var markerOpt = {
    map : googleMap,
    position : googlePos,
    title : 'Hi , I am here',
    animation : google.maps.Animation.DROP
  };
  var googleMarker = new google.maps.Marker(markerOpt);
}

var updateServerLocation = function(location) {
  $.ajax({
    url: "http://127.0.0.1:8000/location",
    type: "POST",
    data: { location : location },
    dataType: 'json',
    error: function(err) {
      console.log('sendCreateNewRoom err', err)
    },
  })
}

$(document).ready(function() {
  var location = {lat: 37.8049, lon: -122.4194};
  updateMapLocation(location)
  updateServerLocation(location)

  $('#btn').on('click', function(e) {
    e.preventDefault()
    location.lat = $('#loc').val().split(/,\s*/)[0];
    location.lon = $('#loc').val().split(/,\s*/)[1];
    $('#usr').text(location.lat + ', ' + location.lon);
    $('#loc').val('');
    updateMapLocation(location)
    updateServerLocation(location)
  })

  $('.spot').on('click', function(e) {
    e.preventDefault()
    location.lat = this.value.split(/,\s*/)[0];
    location.lon = this.value.split(/,\s*/)[1];
    $('#usr').text(location.lat + ', ' + location.lon);
    updateMapLocation(location)
    updateServerLocation(location)
  })
})
