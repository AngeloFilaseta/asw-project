const createLobbyHandler = require("./handlers/createLobbyHandler")
const joinLobbyHandler = require("./handlers/joinLobbyHandler")
const chatHandler = require("./handlers/chatHandler")
const disconnectHandler = require("./handlers/disconnectHandler")
const startGameHandler = require("./handlers/startGameHandler");
const sentenceHandler = require("./handlers/sentenceHandler");
const drawHandler = require("./handlers/drawHandler");
const forwardDataHandler = require("./handlers/forwardDataHandler");
const endGameCommandHandler = require("./handlers/endGameCommandHandler");
const Channels = require("./enum/channels");

module.exports = function (io) {
    io.on('connection', (socket) => {

        socket.on(Channels.CREATE_LOBBY, (json) => createLobbyHandler(socket, json));

        socket.on(Channels.JOIN_LOBBY, (json) => joinLobbyHandler(socket, json));

        socket.on(Channels.START_GAME, (json) => startGameHandler(socket, json));

        socket.on(Channels.SENTENCE, (json) => sentenceHandler(socket, json));

        socket.on(Channels.DRAW, (json) => drawHandler(socket, json));

        socket.on(Channels.FORWARD_DATA, (json) => forwardDataHandler(socket, json));

        socket.on(Channels.CHAT, (json) => chatHandler(socket, json));

        socket.on(Channels.END_GAME, (json) => endGameCommandHandler(socket, json));

        socket.on(Channels.DISCONNECT, () => disconnectHandler(socket));
    });
};

