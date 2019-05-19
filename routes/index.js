const express = require('express');
const router = express.Router();
const MarkerController  = require('../controllers/markerController');
const CityController  = require('../controllers/cityContoller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/markers', MarkerController.get);
router.post('/markers', MarkerController.save);

router.get('/city', CityController.get);
router.post('/city', CityController.save);

module.exports = router;
