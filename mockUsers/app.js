var updateMapLocation = function(lat, long) {
  var googlePos = new google.maps.LatLng(lat, long);
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

$(document).ready(function() {
  updateMapLocation(37.8049, -122.4194)
  var location = [37.7749, -122.4194]

  $('#btn').on('click', function(e) {
    e.preventDefault()
    location = $('#loc').val().split(/,\s*/);
    $('#usr').text(location);
    $('#loc').val('');
    updateMapLocation(location[0], location[1]);
  })

  $('#room').on('click', function(e) {
    e.preventDefault()
    location = this.value.split(/,\s*/);
    $('#usr').text(location);
    updateMapLocation(location[0], location[1]);
  })

  $('#notroom').on('click', function(e) {
    e.preventDefault()
    location = this.value.split(/,\s*/);
    $('#usr').text(location);
    updateMapLocation(location[0], location[1]);
  })
})

module.exports.location = function() {
  return location;
}
