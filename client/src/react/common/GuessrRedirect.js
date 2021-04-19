import { useSelector, useDispatch } from "react-redux"

import { Redirect, Link } from "react-router-dom"
import { setUsername, setId } from "../../redux/userInfo/actions"
import { setEventbus, setIsLoading } from "../../redux/util/actions"
import { 
    setIsPublic, 
    setNTurns, 
    setLanguage,
    setLobbyCode, 
    setStatus, 
    setUsers, 
    setMessages, 
    setMyRoleAdmin, 
    setWaitingAllSubmited, 
    setReceivedData, 
    setReports 
} from "../../redux/lobby/actions"
import { setPreviousReports } from "../../redux/previousReports/actions"

export function RedirectHome(){
    const dispatch = useDispatch()
    resetUtil(dispatch, useSelector(state => state.util.eventbus))
    resetLobby(dispatch)
    resetPreviousReports(dispatch)
    return <Link to="/home"><Redirect to="/home" /></Link>
}

export function RedirectAuthentication(){
    const dispatch = useDispatch()
    resetUserInfo(dispatch)
    resetUtil(dispatch, useSelector(state => state.util.eventbus))
    resetLobby(dispatch)
    resetPreviousReports(dispatch)
    return <Link to="/"><Redirect to="/" /></Link>
}


export function RedirectTo(destination){
    return <Link to={"/"+destination}><Redirect to={"/"+destination} /></Link>
}

export function RedirectLobbyCreation(){
    return <Link to="/lobbyCreation"><Redirect to="/lobbyCreation" /></Link>
}

export function RedirectLobby(){
    return <Link to="/lobby"><Redirect to="/lobby" /></Link>
}

export function RedirectPreviousReports(){
    return <Link to="/previousReports"><Redirect to="/previousReports" /></Link>
}

export function RedirectNotifications(){
    return <Link to="/notifications"><Redirect to="/notifications" /></Link>
}

function resetUserInfo(dispatch){
    dispatch(setUsername(null))
    dispatch(setId(null))
}

function resetUtil(dispatch, eventbus){
    if (eventbus !== null && eventbus !== undefined) {
        eventbus.close()
        dispatch(setEventbus(null))
    }
    dispatch(setIsLoading(false))
}

function resetLobby(dispatch){
    dispatch(setStatus(null));
    dispatch(setLobbyCode(null));
    dispatch(setUsers([]));
    dispatch(setMessages([]));
    dispatch(setMyRoleAdmin(null));
    dispatch(setWaitingAllSubmited(false));
    dispatch(setIsPublic(false));
    dispatch(setNTurns(null));
    dispatch(setLanguage(null));
    dispatch(setReports([]));
    dispatch(setReceivedData(null));
}

function resetPreviousReports(dispatch){
    dispatch(setPreviousReports([]))
}