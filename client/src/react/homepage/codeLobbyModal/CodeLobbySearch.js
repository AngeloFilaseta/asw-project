import {setIsLoading} from "../../../redux/util/actions"
import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";
import {assignHandlers} from "../../../socket/handlers";

export default function searchLobbyByCode(dispatch, onSuccess, code, username, userId){
    const socket = io(SERVER_ADDRESS)
    assignHandlers(socket, dispatch)
    socket.connect();
    socket.emit("joinLobby", {idUser: userId,
                                       username: username,
                                       code: code})
}