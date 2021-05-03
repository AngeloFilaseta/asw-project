import {assignHandlers} from "../../../socket/handlers";
import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";

export default function searchRandomLobby(dispatch, onSuccess, language, username, userId, token){
    const socket = io(SERVER_ADDRESS)
    assignHandlers(socket, dispatch, userId, token)
    socket.connect();
    socket.emit("joinLobby", {idUser: userId,
        username: username,
        language: language})
}