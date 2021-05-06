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
import SubmissionSound from "../sound/submission.mp3"
import NextPhaseSound from "../sound/next_phase.mp3"
import ReportSounds from "../sound/reports.mp3"

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
        new Audio(NextPhaseSound).play()
        NotificationManager.info("Draw time!", '', 1500)
        dispatch(setStatus(PhaseTypes.DRAW))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on(Channels.DRAW, (id_next_user) => {
        dispatch(setReceivedData(id_next_user))
        new Audio(NextPhaseSound).play()
        NotificationManager.info("Sentence time!", '', 1500)
        dispatch(setStatus(PhaseTypes.SENTENCE))
        dispatch(setWaitingAllSubmitted(false))
    })

    socket.on(Channels.FORWARD_DATA, (msg) => {
        let sender = state.lobby.info.users.filter(u => u.id === msg.id_user)
        let areAllDataForwarded = false
        if(msg.sentence !== undefined){
            dispatch(addSentence(msg))
            areAllDataForwarded = state.lobby.reports.filter(r => r.sentence.length !== r.draw.length).length === state.lobby.reports.length
        } else {
            dispatch(addDraw(msg))
            areAllDataForwarded = state.lobby.reports.filter(r => r.sentence.length === r.draw.length).length === state.lobby.reports.length
        }
        if(sender.length && !areAllDataForwarded> 0){
            new Audio(SubmissionSound).play()
            NotificationManager.info(sender[0].username + " has submitted", '', 1500)
        }
        socket.emit(Channels.FORWARD_DATA, msg.lobbyCode)
    })

    socket.on(Channels.SHOW_REPORT, () => {
        dispatch(setStatus(PhaseTypes.SHOWING_REPORT))
        new Audio(ReportSounds).play()
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