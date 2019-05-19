const express = require('express');
const controller = require('../controllers/markerController');
const router = express.Router();

/* GET markers listing. */
router.get('/markers', controller.list);

module.exports = router;
