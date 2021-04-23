import {NotificationManager} from "react-notifications";
import {
    setIsPublic,
    setLanguage,
    setLobbyCode,
    setMessages,
    setMyRoleAdmin, setNTurns,
    setStatus,
    setUsers
} from "../redux/lobby/actions";
import {setIsLoading, setSocket} from "../redux/util/actions";

export function assignHandlers(socket, dispatch){
    dispatch(setIsLoading(true))
    socket.on("joined", (json) => {
        if(json.hasOwnProperty("error")){
            NotificationManager.error(json.error, 'Error', 3000);
        }else{
            dispatch(setMyRoleAdmin(json.isAdmin))
            dispatch(setUsers(json.players))
            dispatch(setSocket(socket))
            dispatch(setStatus("Inside Lobby"))
            dispatch(setLobbyCode(json.lobbyCode))
            dispatch(setLanguage(json.language))
            dispatch(setIsPublic(json.isPublic))
            dispatch(setMessages(json.messages))
            dispatch(setNTurns(json.nTurnsMax))
        }
        dispatch(setIsLoading(false))
    })

    socket.on("players", (players) => {
        dispatch(setUsers(players))
    })

    socket.on("chat", (messages) => {
        dispatch(setMessages(messages))
    })

}