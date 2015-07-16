var LocalStrategy = require('passport-local').Strategy,
    config = require('../config');

module.exports = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, function (username, password, done) {

    if (username === config.admin.name
        && password === config.admin.password) return done(null, config.admin);

    return done(null, false, {message: 'not admin :P'});

});