var config = require('../config');

exports.requireLogin = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    if (req.method === 'GET') req.session.returnTo = req.originalUrl;
    res.redirect('/login');
};

exports.hasAdmin = function(req, res, next) {
    if (req.user.name === config.admin.name) return next();
    res.redirect('/');
};

exports.admin = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            req.flash('info', 'You are not authorized');
            return res.redirect('/users/' + req.profile.id);
        }
        next();
    }
};