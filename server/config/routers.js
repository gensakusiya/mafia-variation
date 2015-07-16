var admin = require('../controllers/admin'),
    home = require('../controllers/home'),
    auth = require('./middlewares/authorization');

var adminAuth = [auth.requireLogin, auth.hasAdmin];

module.exports = function (app, passport) {

    app.get('/login', admin.login);
    app.get('/logout', admin.logout);

    app.post('/login', admin.session);

    app.get('/admin', adminAuth, admin.index);

    app.get('/', home.index);
    app.post('/comeIn', home.comeIn);

    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).render('500', {err: err.stack});
    });

    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};