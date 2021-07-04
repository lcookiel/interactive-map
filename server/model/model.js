const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true
    },
    polygon: {
        type: Array,
        required: true,
        unique: true
    },
})

const countryPolygons = mongoose.model('countryPolygons', schema);

module.exports = countryPolygons;