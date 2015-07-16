var io, gameSocket, playerCount = 0, player = {};

var mafia = require('./mafia'),
    round;

exports.initGame = function(sio, socket) {

    io = sio;
    gameSocket = socket;

    gameSocket.emit('connected', {message: 'Вы в игре!))'});

    // Host Events
    gameSocket.on('hostInitTable', hostInitGame);
    gameSocket.on('startGame', startGame);

    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    gameSocket.on('playerDisconnectGame', playerDisconnectGame);

    // Game Event
    gameSocket.on('nightInCity', nightInCity);

};

function hostInitGame() {
    console.log('all player - ' + player.length);
    console.log('all player - ' + player.toString());
}

function startGame(data) {

    round = mafia(data, player, playerCount);

    for (var field in round.players) if (round.players.hasOwnProperty(field)) {
        getPlayerSocket(field).emit('setRole', round.players[field].Role);
    }

}

function playerJoinGame(data) {
    if (!player[this.id]) {
        var role = data.leading === undefined ? 0 : data.leading;

        player[this.id] = {
            Name: data.name,
            Leading: role
        };

        playerCount++;
        var playerSocket = getPlayerSocket(this.id);
        playerSocket.emit('playerJoinedGame', {
            sessionId: this.id
        });
    }
}

function playerDisconnectGame() {
    if (player[this.id]) {
        delete player[this.id];
        playerCount--;
    }
}

function getPlayerSocket(sessionId) {
    for (var i = 0; i < io.sockets.sockets.length; i++) {
        if (io.sockets.sockets[i].id === sessionId) {
            return io.sockets.sockets[i];
        }
    }
}

function nightInCity() {
    if (round.firstNight) {
        var playerSocket = getPlayerSocket(this.id);
        round.firstNight = false;
        playerSocket.emit('afterNight', {
            firstNight: true,
            list: round.getPerson()
        });
    } else {

    }
}