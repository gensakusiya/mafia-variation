var passport = require('passport');

exports.index = function (req, res) {
    res.render('admin/index');
};

exports.login = function (req, res) {
    res.render('admin/login', {title: 'Login'});
};
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.session = function(req, res, next) {
    // ask passport to authenticate
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            // if error happens
            return next(err);
        }

        if (!user) {
            // if authentication fail, get the error message that we set
            // from previous (info.message) step, assign it into to
            // req.session and redirect to the login page again to display
            req.session.messages = info.message;
            return res.redirect('/login');
        }

        // if everything's OK
        req.logIn(user, function(err) {
            if (err) {
                req.session.messages = "Error";
                return next(err);
            }

            // set the message
            req.session.messages = "Login successfully";
            return res.redirect('/');
        });

    })(req, res, next);
};