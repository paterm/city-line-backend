const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');
const MarkerController = require('../controllers/markerController');
const CityController = require('../controllers/cityContoller');

/* GET home page. */
router.get('/', HomeController.index);

router.get('/markers', MarkerController.get);
router.post('/markers', MarkerController.save);

router.get('/city', CityController.get);
router.post('/city', CityController.save);

module.exports = router;
