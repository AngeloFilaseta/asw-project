import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";
import {assignHandlers} from "../../../socket/handlers";

export default function searchLobbyByCode(dispatch, onSuccess, code, username, userId, token){
    const socket = io(SERVER_ADDRESS)
    assignHandlers(socket, dispatch, userId, token)
    socket.connect();
    socket.emit("joinLobby", {idUser: userId,
                                       username: username,
                                       code: code})
}