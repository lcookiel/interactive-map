var mymap = L.map('mapid').setView([20, 0], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

var popup = L.popup();

// popup
//     .setLatLng({ lat: 50.222181156529786, lng: 30.883238717080502 })
//     .setContent('hello test')
//     .openOn(mymap);




function onMapClick(e) {

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // alert(lat + '\n' + lng);


    // let url = 'http://localhost:5000/api/country';
    // 
    // data to be sent to the POST request
    // let coordinates = {
    //     lat: lat,
    //     lng: lng
    // }
    //
    // $.post(url, coordinates, function(data) {
    //     // console.log(`${data} and status is ${status}`);
    //     // console.log(Object.keys(data));
    //     console.log(data.address.country);
    // });


    let reverseGeocodingAPI = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`;

    $.post(reverseGeocodingAPI, function(data) {
        if (data.error) {
            console.error(data.error);
        } else {
            countryName = data.address.country.replace(/ /g, '+');
            console.log(countryName);

            // TODO: use countryName to make request for polygon

        }
    });

}

mymap.on('click', onMapClick);