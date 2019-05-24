const passport = require('passport');

const controller = {
    renderLoginPage: (req, res) => res.render('login', {flash: req.flash()}),
    renderSignUpPage: (req, res) => res.render('signup', {flash: req.flash()}),
    auth(req, res, next, passport) {
        console.log(passport);
        passport.authenticate('local', (e) => console.log(e))(req, res, next);
    },
    register: passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    })
};

module.exports = controller;
