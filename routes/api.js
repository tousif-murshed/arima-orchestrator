var express = require('express');
var router = express.Router();
var ForecastController = require('../controllers/forecastController.js')
router.get('/ForecastAllRec',ForecastController.getForecastAllrecords);
router.post('/Forecast',ForecastController.getForecast);

module.exports = router;

