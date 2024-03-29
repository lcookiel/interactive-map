const axios = require('axios');

var countryPolygons = require('../model/model');


// create and save new entry with country polygon in DB
exports.createPolygon = (req, res) => {
    // if request is empty
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // new polygon entry
    const polygon = new countryPolygons({
        countryName: req.body.country,
        polygon: req.body.polygon
    });

    // save entry to database
    polygon
        .save(polygon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'An unknown error occurred while creating a polygon in the database.'
            });
        });
};


// retrieve country polygon given name / retrieve and return all polygons in DB if country is not specified
exports.getPolygon = (req, res) => {

    if (req.body.country) {
        const country = req.body.country;

        countryPolygons.findOne({ countryName: country })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Country "${country}" is not found.` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || `Error occured while retrieving "${country}" polygon.` })
            })

    } else {
        countryPolygons.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving polygon." })
            })
    }

}


// Update a polygon in database by country name
exports.updatePolygon = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" });
    }

    const country = req.body.country;
    countryPolygons.findOneAndUpdate({ countryName: country }, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update "${country}" polygon.` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating polygon" });
        });
};


// delete country polygon given name
exports.deletePolygon = (req, res) => {
    const country = req.body.country;

    countryPolygons.findOneAndDelete({ countryName: country })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Couldn't delete polygon "${country}"` })
            } else {
                res.send({
                    message: `Polygon "${country}" was deleted successfully.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Couldn't delete polygon "${country}"`
            });
        });
}


// reverse geocoding request to OpenStreetMap server
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