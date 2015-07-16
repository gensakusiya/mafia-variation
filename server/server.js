var express = require('express'),
    passport = require('passport'),
    config = require('./config/config'),
    game = require('./game/');

var app = express();

// config passport
require('./config/passport')(passport);

// config application
require('./config/express')(app, passport);

// config router
require('./config/routers')(app, passport);

config.port = process.env.PORT || config.port;
var io = require('socket.io').listen(app.listen(config.port));
console.log('Express app started on port ' + config.port);

io.sockets.on('connection', function(socket) {
    console.log('socket init game init');
    game.initGame(io, socket);
});

module.exports = app;
