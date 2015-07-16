exports.index = function (req, res) {
    res.render('home/index', {
        user: req.user
    });
};

exports.comeIn = function(req, res) {
    res.render('playRoom/index', {
        name: req.body.login,
        user: req.user
    });
};