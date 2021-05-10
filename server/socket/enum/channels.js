/**
 * Socket channels for messages
 */
const Channels = {

    CREATE_LOBBY: "createLobby",

    JOIN_LOBBY: "joinLobby",

    START_GAME: "startGame",

    SENTENCE: "sentence",

    DRAW: "draw",

    CHAT: "chat",

    FORWARD_DATA: "forwardData",

    END_GAME: "endGameCommand",

    DISCONNECT: "disconnect",


    //Client Only

    SHOW_REPORT: "showReport",

    BACK_TO_LOBBY: "backToLobby",

    JOINED: "joined",

    PLAYERS: "players"
};

module.exports = Channels;
