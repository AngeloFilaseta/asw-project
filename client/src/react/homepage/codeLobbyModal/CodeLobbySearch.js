import {setIsLoading, setSocket} from "../../../redux/util/actions"
import {setLobbyCode, setMyRoleAdmin, setStatus, setUsers} from "../../../redux/lobby/actions"
import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";

export default function searchLobbyByCode(dispatch, onSuccess, code, username, userId){
    dispatch(setIsLoading(true))
    const socket = io(SERVER_ADDRESS)

    socket.on("lobbyCode", (json) => {
        console.log("Connected to lobby " + json.lobbyCode)
        dispatch(setMyRoleAdmin(false))
        dispatch(setUsers(json.players))
        dispatch(setSocket(socket))
        dispatch(setStatus("Inside Lobby"))
        dispatch(setLobbyCode(json.lobbyCode))
        dispatch(setIsLoading(false))
    })

    socket.connect();
    socket.emit("joinLobbyCode", {idUser: userId,
                                       username: username,
                                       code: code})
}