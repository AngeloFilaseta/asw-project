import {NotificationManager} from "react-notifications"
import {
    setIsPublic,
    setLanguage,
    setLobbyCode,
    setMessages,
    setMyRoleAdmin, 
    setNTurns, 
    setReceivedData, 
    setReports,
    setStatus,
    setUsers, 
    setWaitingAllSubmitted,
    addSentence,
    addDraw
} from "../redux/lobby/actions"
import {setIsLoading, setSocket} from "../redux/util/actions"
import PhaseTypes from "../util/phaseType"
import {Channels} from "./enum/channels"
import {createNotificationRequest} from "../react/notifications/NotificationLogic"

import NewMsgSound from "../sound/new_msg.mp3"
import JoinSound from "../sound/join.mp3"
import LeftSound from "../sound/left.mp3"

export function assignHandlers(socket, dispatch, state){
    dispatch(setIsLoading(true))
    socket.on(Channels.JOINED, (json) => {
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

    socket.on(Channels.PLAYERS, (players) => {

        let currentPlayers = Array.from(state.lobby.info.users.map(p => {return p.username}))
        let updatedPlayers = Array.from(players.map(p => {return p.username}))
        if(updatedPlayers.length > currentPlayers.length){
            new Audio(JoinSound).play()
            NotificationManager.info(updatedPlayers[updatedPlayers.length-1] + " joined the lobby", '', 2000)
        } else if(updatedPlayers.length < currentPlayers.length){
            let diff = currentPlayers.filter(p => !updatedPlayers.includes(p))
            if(diff.length > 0){
                new Audio(LeftSound).play()
                NotificationManager.info(diff[0] + " left the lobby", '', 2000)
            }
        }
        dispatch(setUsers(players))
        
        let reportsArray = []
            players.forEach((player) => {
                if(player.id === state.userInfo.id){
                    dispatch(setMyRoleAdmin(player.type))
                }
                reportsArray.push(
                    {
                        id: player.id,
                        username: player.username,
                        sentence: [],
                        draw: []
                    }
                )
            })
        if(PhaseTypes.INSIDE_LOBBY === state.lobby.status){
            dispatch(setReports(reportsArray))
        }
    })

    socket.on(Channels.CHAT, (messages) => {
        if(messages[messages.length - 1].username !== state.userInfo.username){
            console.log(state.userInfo.username)
            new Audio(NewMsgSound).play()
        }
        dispatch(setMessages(messages))
    })

    socket.on(Channels.SENTENCE, (id_next_user) => {
        dispatch(setReceivedData(id_next_user))
        dispatch(setStatus(PhaseTypes.DRAW))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on(Channels.DRAW, (id_next_user) => {
        dispatch(setReceivedData(id_next_user))
        dispatch(setStatus(PhaseTypes.SENTENCE))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on(Channels.FORWARD_DATA, (msg) => {
        if(msg.sentence !== undefined){
            dispatch(addSentence(msg))
        } else {
            dispatch(addDraw(msg))
        }
        socket.emit(Channels.FORWARD_DATA, msg.lobbyCode)
    })

    socket.on(Channels.SHOW_REPORT, () => {
        dispatch(setStatus(PhaseTypes.SHOWING_REPORT))
        createNotificationRequest(
            dispatch, 
            state.userInfo.id, 
            state.userInfo.token,
            "New reports are available!",
            "Check the Previous report section."
        )
    })

    socket.on(Channels.BACK_TO_LOBBY, () => {
        dispatch(setStatus(PhaseTypes.INSIDE_LOBBY))
        let reportsArray = []
        state.lobby.info.users.forEach((player) => {
            reportsArray.push(
                {
                    id: player.id,
                    username: player.username,
                    sentence: [],
                    draw: []
                }
            )
        })
        dispatch(setReports(reportsArray))
    })

}