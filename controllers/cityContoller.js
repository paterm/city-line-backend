const City = require('../db/model/city');

const controller = {
    get: (req, res) => City.model.find({}, (err, cities) => res.json(cities)),
    save: (req, res) => City.methods.save(req.body).then(model => res.json(model))
};

module.exports = controller;
