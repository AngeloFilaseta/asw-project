import { NotificationManager } from "react-notifications"
import { io } from "socket.io-client"
import { SERVER_ADDRESS } from "../../util/global"
import { setIsLoading } from "../../redux/util/actions"
import {assignHandlers} from "../../socket/handlers";

export function createLobby(dispatch, isPublic, nTurns, language, username, id_user, token) {
    if (nTurns === null || Number.isNaN(nTurns) || nTurns <= 0) {
      NotificationManager.error("Please insert the number of turns correctly!", 'Error', 3000);
    } else {
            setIsLoading(true)
            const socket = io(SERVER_ADDRESS)
            assignHandlers(socket, dispatch)
            socket.connect();
            socket.emit("createLobby", {idUser: id_user,
                                                 username: username,
                                                 nTurnsMax: nTurns,
                                                 language: language,
                                                 isPublic: isPublic})
     }
  }