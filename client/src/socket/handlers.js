import {NotificationManager} from "react-notifications";
import {
    setIsPublic,
    setLanguage,
    setLobbyCode,
    setMessages,
    setMyRoleAdmin, setNTurns, setReceivedData, setReports,
    setStatus,
    setUsers, setWaitingAllSubmitted
} from "../redux/lobby/actions";
import {setIsLoading, setSocket} from "../redux/util/actions";
import PhaseTypes from "../util/phaseType";

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

    socket.on("sentence", (sentence) => {
        dispatch(setReceivedData(sentence))
        dispatch(setStatus(PhaseTypes.DRAW))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on("draw", (draw) => {
        dispatch(setReceivedData(draw))
        dispatch(setStatus(PhaseTypes.SENTENCE))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on("showReport", (reports) => {
        dispatch(setStatus(PhaseTypes.SHOWING_REPORT))
        dispatch(setReports(reports))
    })

    socket.on("backToLobby", (draw) => {
        dispatch(setStatus(PhaseTypes.INSIDE_LOBBY))
    })

}