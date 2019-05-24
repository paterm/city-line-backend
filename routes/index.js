const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const HomeController = require('../controllers/homeController');
const MarkerController = require('../controllers/markerController');
const CityController = require('../controllers/cityContoller');
const AdminController = require('../controllers/adminController');

const isAuthenticated = (req, res, next) => {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
};

module.exports = passport => {
    router.get('/login', AuthController.renderLoginPage);
    router.post('/login', (req, res, next) => {
        passport.authenticate('login', (err, user, info) => {
            if (err) return res.status(404).json({error: err});
            if (!user) return res.status(404).json({error: info});

            req.login(user, err => {
                if (err) return res.status(404).json({error: err});
                res.locals.user = user;
                res.json({redirect: '/admin'});
            });
        })(req, res, next);
    });

    /* GET Registration Page */
    router.get('/signup', AuthController.renderSignUpPage);
    router.post('/signup', (req, res, next) => {
        passport.authenticate('signup', (err, user) => {
            if (err) return res.status(400).json({error: err});

            req.login(user, err => {
                if (err) return res.status(404).json({error: err});

                res.json({
                    redirect: '/',
                    message: {
                        title: 'Авторизация',
                        text: 'Авторизация прошла успешно'
                    }
                });
            });
        })(req, res, next);
    });

    router.get('/signout', (req, res) => {
        res.locals.user = null;
        req.logout();
        res.redirect('/');
    });

    router.get('/', HomeController.index);

    router.get('/markers', isAuthenticated, MarkerController.get);
    router.post('/markers', isAuthenticated, MarkerController.save);

    router.get('/city', isAuthenticated, CityController.get);
    router.post('/city', isAuthenticated, CityController.save);

    router.get('/admin', isAuthenticated, AdminController.index);

    return  router;
};
