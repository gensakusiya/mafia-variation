$(function() {

    'use strict';

    var IO = {
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },

        bindEvents: function() {
            IO.socket.on('connected', IO.onConnected);
            IO.socket.on('playerJoinedGame', IO.playerJoinedGame);
            IO.socket.on('setRole', IO.onSetRole);
            IO.socket.on('afterNight', IO.afterNight);
        },

        onConnected: function() {
            //Game.mySocketId = IO.socket.socket.sessionid;
        },
        playerJoinedGame: function(sessionId) {
            Game.mySocketId = sessionId;

            Game.Table.init();
        },
        onSetRole: function(res) {
            Game.Player.onSetRole(res);
        },
        afterNight: function(res) {
            Game.Table.afterNight(res);
        }

    };

    var Game = {
        gameId: 0,
        mySocketId: '',

        init: function() {
            Game.bindEvents();
        },

        bindEvents: function() {
            $('#joinButton').on('click', Game.Player.onJoinClick);
            $('#startGame').on('click', Game.Table.onStartGame);
            $('#day').on('click', Game.Table.onDayGame);
            $('#night').on('click', Game.Table.onNightGame);
            $(window).on('beforeunload', Game.Player.onDisconnect)
        },

        Player: {
            hostSocketId: '',
            myName: '',

            onJoinClick: function() {
                var leading = 0;

                if ($('#leading').prop('checked')) {
                    leading = 1;
                }

                var data = {
                    name: $('#login').val(),
                    leading: leading
                };

                IO.socket.emit('playerJoinGame', data);

                Game.Player.myName = data.name;
            },
            onDisconnect: function() {
                IO.socket.emit('playerDisconnectGame');
            },
            onSetRole: function(res) {
                var $img = $('<img>').attr('src', res.img).attr('width', '160px');
                $('#tableImg').html($img)
            }
        },

        Table: {
            init: function() {
                $('#enterGame').hide();
                $('#table').show();

                $('[data-bind="name"]').text($('#login').val());
            },

            onStartGame: function() {
                var data = {};

                IO.socket.emit('startGame', data);
            },
            onDayGame: function(res) {

            },
            onNightGame: function(res) {
                IO.socket.emit('nightInCity');
            },
            afterNight: function(res) {
                $('#listRound').html(res.list.join(' '));
            }
        }
    };

    IO.init();
    Game.init();

});