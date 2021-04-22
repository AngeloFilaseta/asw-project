import { NotificationManager } from "react-notifications"
import { io } from "socket.io-client"
import { SERVER_ADDRESS } from "../../util/global"
import { setSocket, setIsLoading } from "../../redux/util/actions"
import { setLobbyCode, setMyRoleAdmin, setStatus, setUsers } from "../../redux/lobby/actions"
import PlayerType from "../../util/playerType";

export function createLobby(dispatch, isPublic, nTurns, language, username, id_user, token) {
    if (nTurns === null || Number.isNaN(nTurns) || nTurns <= 0) {
      NotificationManager.error("Please insert the number of turns correctly!", 'Error', 3000);
    } else {
            setIsLoading(true)
            const socket = io(SERVER_ADDRESS)

            socket.on("joined", (lobbyCode) => {
                console.log("Connected to lobby " + lobbyCode)
                dispatch(setMyRoleAdmin(true))
                dispatch(setUsers([{id: id_user, username: username, type: PlayerType.ADMIN}]))
                dispatch(setSocket(socket))
                dispatch(setStatus("Inside Lobby"))
                dispatch(setLobbyCode(lobbyCode))
                dispatch(setIsLoading(false))
            })

            socket.on("players", (players) => {
                dispatch(setUsers(players))
            })

        /*
            socket.on("closeLobby", (json) => {
                if(json.hasOwnProperty("error")){
                    console.log(json.error)
                    NotificationManager.error(json.error, 'Lobby has been closed', 3000);
                }
                socket.close();
            })*/

            socket.connect();
            socket.emit("createLobby", {idUser: id_user,
                                                 username: username,
                                                 nTurnsMax: nTurns,
                                                 language: language,
                                                 isPublic: isPublic})
     }
  }