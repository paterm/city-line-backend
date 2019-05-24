const City = require('../db/model/city');

module.exports = {
    index(req, res) {
        return City.model.find({}, (err, docs) => {
            return res.render('admin/markers', {
                title: 'Маркеры',
                cities: docs,
                user: req.user
            });
        });
    }
};
