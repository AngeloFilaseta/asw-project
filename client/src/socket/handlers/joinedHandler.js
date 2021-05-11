import {NotificationManager} from "react-notifications";
import {setIsPublic,
        setLanguage,
        setLobbyCode,
        setMessages,
        setMyRoleAdmin, setNTurns,
        setStatus,
        setUsers} from "../../redux/lobby/actions";
import {setIsLoading, setSocket} from "../../redux/util/actions";

export function joinHandler(json, dispatch, socket){
    if(json.hasOwnProperty("error")){
        NotificationManager.error(json.error, 'Error', 3000);
    }else{
        dispatch(setMyRoleAdmin(json["isAdmin"]))
        dispatch(setUsers(json["players"]))
        dispatch(setSocket(socket))
        dispatch(setStatus("Inside Lobby"))
        dispatch(setLobbyCode(json.lobbyCode))
        dispatch(setLanguage(json.language))
        dispatch(setIsPublic(json.isPublic))
        dispatch(setMessages(json.messages))
        dispatch(setNTurns(json.nTurnsMax))
    }
    dispatch(setIsLoading(false))
}