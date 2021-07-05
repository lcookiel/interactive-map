const express = require('express');
const route = express.Router();


const services = require('../services/render');
const controller = require('../controller/controller');


/**  
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);


// API
route.post('/api/nominatim', controller.nominatimReverseGeocode);
route.post('/api/createPolygon', controller.createPolygon);
route.get('/api/getPolygon', controller.getPolygon);
route.put('/api/updatePolygon', controller.updatePolygon);
route.delete('/api/deletePolygon', controller.deletePolygon);

module.exports = route;