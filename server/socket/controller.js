const createLobbyHandler = require("./handlers/createLobbyHandler")
const joinLobbyCodeHandler = require("./handlers/joinLobbyCodeHandler")
const joinLobbyLanguageHandler = require("./handlers/joinLobbyCodeHandler")
const chatHandler = require("./handlers/joinLobbyCodeHandler")
const disconnectHandler = require("./handlers/disconnectHandler")

module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('connect', () => console.log("lol"));

        socket.on('createLobby', (json) => createLobbyHandler(socket, json));

        socket.on('joinLobbyCode', (json) => joinLobbyCodeHandler(socket, json));

        socket.on('joinLobbyLanguage', (json) => joinLobbyLanguageHandler(socket, json));

        socket.on('chat', (json) => chatHandler(socket, json));

        socket.on('disconnect', () => disconnectHandler(socket));
    });
};

