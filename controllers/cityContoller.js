const City = require('../db/model/city');

const controller = {
    get: (req, res) => City.model.find({}, (err, markers) => res.json(markers)),
    save: (req, res) => City.methods.save(req.body).then(model => res.json(model))
};

module.exports = controller;
