const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const initPassport = require('./authentication/init');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const lodash = require('lodash');
const flash = require('connect-flash');
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets/')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap-material-design/dist/')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(cookieParser());
app.use(session({
  secret: 'aasdd123fasd12e1fwfa',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
initPassport(passport);

const router = require('./routes/index')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global._ = lodash;

module.exports = app;
