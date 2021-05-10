import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";
import {assignHandlers} from "../../../socket/handlers";

export default function searchLobbyByCode(dispatch, state, code){
    const socket = io(SERVER_ADDRESS)
    assignHandlers(socket, dispatch, state)
    socket.connect();
    socket.emit("joinLobby", {idUser: state.userInfo.id, username: state.userInfo.username, code: code})
}