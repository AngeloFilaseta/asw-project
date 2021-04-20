import { NotificationManager } from "react-notifications"
import { io } from "socket.io-client"
import { SERVER_ADDRESS } from "../../util/global"
import { setSocket, setIsLoading } from "../../redux/util/actions"
import { setLobbyCode, setMyRoleAdmin, setStatus, setUsers } from "../../redux/lobby/actions"

export function createLobby(dispatch, isPublic, nTurns, language, username, id_user, token) {
    console.log(isPublic, nTurns, language, username, id_user)
    if (nTurns === null || Number.isNaN(nTurns) || nTurns <= 0) {
      NotificationManager.error("Please insert the number of turns correctly!", 'Error', 3000);
    } else {
            const socket = io(SERVER_ADDRESS)
            socket.on('connection', socket => {
              console.log("connected");
            });

            socket.on("lobbyCode", (lobbyCode) => {
              console.log("Connected to lobby " + lobbyCode);
            });

            socket.connect();
            socket.emit("createLobby","");
     }
  }