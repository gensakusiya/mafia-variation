var express = require('express'),
    session = require('express-session'),
    compression = require('compression'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    csurf = require('csurf'),
    multer = require('multer'),
    swig = require('swig');

var flash = require('connect-flash'),
    winston = require('winston'),
    helpers = require('view-helpers'),
    config = require('./config');

module.exports = function(app, passport) {

    app.use(compression({
        threshold: 512
    }));

    app.use('/content/img', express.static(config.staticRoot + '/client/content/img'));
    app.use(express.static(config.staticRoot + '/client'));
    app.use(morgan({
        stream: {
            write: function(message, encoding) {
                winston.info(message);
            }
        }
    }));

    app.engine('html', swig.renderFile);
    app.set('views', config.root + '/views');
    app.set('view engine', 'html');

    // expose req for views
    app.use(function (req, res, next) {
        res.currentReq = req;
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(multer());
    app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    app.use(cookieParser());
    app.use(cookieSession({secret: 'secret'}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
};