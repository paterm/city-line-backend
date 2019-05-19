const City = require('../db/model/city');
const Marker = require('../db/model/marker');

const controller = {
    get: (req, res) => {
        console.log(req);
        if (req.query.city) {
            return City.model.findOne({name: req.query.city}, (err, city) => {
                return Marker.model.find({city_id: city._id}, (err, markers) => res.json(markers))
            });
        } else {
            return Marker.model.find({}, (err, markers) => res.json(markers))
        }
    },
    save: (req, res) => Marker.methods.save(req.body).then(model => res.json(model))
};

module.exports = controller;