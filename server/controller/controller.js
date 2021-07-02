const axios = require('axios');


exports.nominatimReverseGeocode = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    const coordinates = {
        latitude: req.body.lat,
        longtitude: req.body.lng
    };

    const url = `https://nominatim.openstreetmap.org/reverse.php
    ?lat=${coordinates.latitude}&lon=${coordinates.longtitude}&zoom=18&format=jsonv2`;

    function getSrc() {
        return axios.get(url)
            .then(response => {
                this.response = response.data;
                return this.response;
            });
    }

    getSrc().then(data => {
        console.log(data);
        res.send(data);
    });

};