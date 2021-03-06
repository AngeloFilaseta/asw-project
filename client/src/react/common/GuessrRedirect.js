import { useSelector, useDispatch } from "react-redux"

import { Redirect, Link } from "react-router-dom"
import { setUsername, setId } from "../../redux/userInfo/actions"
import { setSocket, setIsLoading } from "../../redux/util/actions"
import { 
    setIsPublic, 
    setNTurns, 
    setLanguage,
    setLobbyCode, 
    setStatus, 
    setUsers, 
    setMessages, 
    setMyRoleAdmin,
    setWaitingAllSubmitted,
    setReceivedData, 
    setReports 
} from "../../redux/lobby/actions"
import { setPreviousReports } from "../../redux/previousReports/actions"
import { DEFAULT_IS_PUBLIC, DEFAULT_N_TURNS, DEFAULT_LANGUAGE } from "../../util/global"

export function RedirectHome(){
    const dispatch = useDispatch()
    resetUtil(dispatch, useSelector(state => state.util.socket))
    resetLobby(dispatch)
    resetPreviousReports(dispatch)
    return <Link to="/home"><Redirect to="/home" /></Link>
}

export function RedirectTo(destination){
    return <Link to={"/"+destination}><Redirect to={"/"+destination} /></Link>
}

export function RedirectAuthentication(){
    const dispatch = useDispatch()
    resetPreviousReports(dispatch)
    resetUserInfo(dispatch)
    resetUtil(dispatch, useSelector(state => state.util.socket))
    resetLobby(dispatch)
    return RedirectTo("")
}

export function RedirectLobbyCreation(){
    return RedirectTo("lobby-creation")
}

export function RedirectLobby(){
    return RedirectTo("lobby")
}

export function RedirectPreviousReports(){
    return RedirectTo("show-previous-reports")
}

export function RedirectNotifications(){
    const dispatch = useDispatch()
    resetUtil(dispatch, useSelector(state => state.util.socket))
    resetLobby(dispatch)
    return RedirectTo("notifications")
}

function resetUserInfo(dispatch){
    dispatch(setUsername(null))
    dispatch(setId(null))
}

function resetUtil(dispatch, socket){
    if (socket !== null && socket !== undefined) {
        socket.close()
        dispatch(setSocket(null))
    }
    dispatch(setIsLoading(false))
}

function resetLobby(dispatch){
    dispatch(setStatus(null))
    dispatch(setLobbyCode(null))
    dispatch(setUsers([]))
    dispatch(setMessages([]))
    dispatch(setMyRoleAdmin(null))
    dispatch(setWaitingAllSubmitted(false))
    dispatch(setIsPublic(DEFAULT_IS_PUBLIC))
    dispatch(setNTurns(DEFAULT_N_TURNS))
    dispatch(setLanguage(DEFAULT_LANGUAGE))
    dispatch(setReports([]))
    dispatch(setReceivedData(null))
}

function resetPreviousReports(dispatch){
    dispatch(setPreviousReports([]))
}