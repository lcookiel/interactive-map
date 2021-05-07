var mymap = L.map('mapid').setView([0, 0], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);


var popup = L.popup();

// function getJSONP(url, success) {
//
//   var ud = '_' + +new Date,
//     script = document.createElement('script'),
//     head = document.getElementsByTagName('head')[0] ||
//     document.documentElement;
//
//   window[ud] = function(data) {
//     head.removeChild(script);
//     success && success(data);
//   };
//
//   script.src = url.replace('callback=?', 'callback=' + ud);
//   head.appendChild(script);
//
// }


function latlng_to_name(lat, lon) {}

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString() + "</br>" +
      "You clicked the map at " + e.latlng.toString() + "</br>" +
      "You clicked the map at " + e.latlng.toString() + "</br>" +
      "You clicked the map at " + e.latlng.toString() + "</br>" +
      "You clicked the map at " + e.latlng.toString() + "</br>" +
      "You clicked the map at " + e.latlng + "</br>")
    .openOn(mymap);
}

mymap.on('click', onMapClick);
