import {setIsLoading, setSocket} from "../../../redux/util/actions"
import {
    setIsPublic,
    setLanguage,
    setLobbyCode,
    setMyRoleAdmin,
    setNTurns,
    setStatus,
    setUsers
} from "../../../redux/lobby/actions"
import {io} from "socket.io-client";
import {SERVER_ADDRESS} from "../../../util/global";
import {NotificationManager} from "react-notifications";

export default function searchLobbyByCode(dispatch, onSuccess, code, username, userId){
    dispatch(setIsLoading(true))
    const socket = io(SERVER_ADDRESS)

    socket.on("joined", (json) => {
        if(json.hasOwnProperty("error")){
            NotificationManager.error(json.error, 'Error', 3000);
        }else{
            console.log("Connected to lobby " + json.lobbyCode)
            dispatch(setMyRoleAdmin(false))
            dispatch(setUsers(json.players))
            dispatch(setSocket(socket))
            dispatch(setStatus("Inside Lobby"))
            dispatch(setLobbyCode(json.lobbyCode))
            dispatch(setLanguage(json.language))
            dispatch(setIsPublic(json.isPublic))
            dispatch(setNTurns(json.nTurnsMax))
            dispatch(setIsLoading(false))
        }
    })

    socket.on("players", (players) => {
        console.log("players received:" + players)
        dispatch(setUsers(players))
    })

    socket.connect();
    socket.emit("joinLobbyCode", {idUser: userId,
                                       username: username,
                                       code: code})
}