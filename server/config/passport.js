var local = require('./passportStrategy/local'),
    config = require('./config.js');

module.exports = function(passport) {

    passport.use(local);

    passport.serializeUser(function(user, done) {
        done(null, user.name);
    });

    passport.deserializeUser(function(name, done) {
        var user = {};

        if (config.admin.name === name) {
            user = config.admin;
        }

        done(null, user);
    });

};