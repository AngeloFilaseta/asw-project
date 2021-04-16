import { setIsLoading } from "../../../redux/util/actions"
import { setLobbyCode } from "../../../redux/lobby/actions"

export default function searchRandomLobby(dispatch, onSuccess, language, username, userId){
    dispatch(setIsLoading(true))
        setTimeout(function () {
            dispatch(setIsLoading(false))
            //TODO try search random lobby
            console.log(language)
            console.log(username)
            console.log(userId)
            dispatch(setLobbyCode("CMSVAM"))
            onSuccess()
        }, 1000)
    
}