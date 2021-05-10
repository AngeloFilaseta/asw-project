import {assignHandlers} from "../../../socket/handlers"
import {io} from "socket.io-client"
import {SERVER_ADDRESS} from "../../../util/global"

export default function searchRandomLobby(dispatch, state, language){
    const socket = io(SERVER_ADDRESS)
    assignHandlers(socket, dispatch, state)
    socket.connect();
    socket.emit("joinLobby", {idUser: state.userInfo.id,
        username: state.userInfo.username,
        language: language})
}