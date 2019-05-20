const City = require('../db/model/city');

const controller = {
    index(req, res) {
        City.model.find({}, (err, docs) => {
            res.render('index', { title: 'Express', cities: docs });
        });
    }
};

module.exports = controller;
