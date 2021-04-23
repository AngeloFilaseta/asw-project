const createLobbyHandler = require("./handlers/createLobbyHandler")
const joinLobbyHandler = require("./handlers/joinLobbyHandler")
const chatHandler = require("./handlers/chatHandler")
const disconnectHandler = require("./handlers/disconnectHandler")
const startGameHandler = require("./handlers/startGameHandler");

module.exports = function (io) {
    io.on('connection', (socket) => {

        socket.on('createLobby', (json) => createLobbyHandler(socket, json));

        socket.on('joinLobby', (json) => joinLobbyHandler(socket, json));

        socket.on('startGame', (json) => startGameHandler(socket, json));

        socket.on('sentence', (json) => sentenceHandler(socket, json));

        socket.on('chat', (json) => chatHandler(socket, json));

        socket.on('disconnect', () => disconnectHandler(socket));
    });
};

