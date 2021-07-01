const axios = require('axios');


exports.reverseGeocode = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // res.send('GET request to the page');

    const coordinates = {
        latitude: req.body.lat,
        longtitude: req.body.lng
    };

    // res.send(`Sent coordinates: ${coordinates.latitude}, ${coordinates.longtitude}`);


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

    // res.send(JSONResult);


    // https://github.com/akashyap2013/CRUD_Application_Node/blob/master/server/controller/controller.js
    // https://github.com/akashyap2013/CRUD_Application_Node/search?q=api%2Fusers
};