module.exports = {
    index(req, res) {
        res.render('index', { title: 'Линия города', user: req.user });
    }
};
