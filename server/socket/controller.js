const CodeGenerator = require("../util/CodeGenerator");

let lobbyCodes = []; // TODO move in model

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log("client connected");

        socket.on('createLobby', () => {
            let lobbyCode; //TODO CHECK CONCURRENCY
            do{
                lobbyCode = CodeGenerator.generateRandomCode();
            }while(lobbyCodes.includes(lobbyCode));
            socket.join(lobbyCode);
            socket.emit("lobbyCode", lobbyCode);
        });

        socket.on('joinLobby', (lobbyCode) => {
            if(lobbyCodes.includes(lobbyCode)){
                socket.join(lobbyCode);//TODO CHECK CONCURRENCY
            }
        });
    });
};

