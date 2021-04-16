import { setIsLoading } from "../../../redux/util/actions"
import { setLobbyCode } from "../../../redux/lobby/actions"

export default function searchLobbyByCode(dispatch, onSuccess, code, username, userId){
    dispatch(setIsLoading(true))
        setTimeout(function () {
            dispatch(setIsLoading(false))
            //TODO try search random lobby
            console.log(code)
            console.log(username)
            console.log(userId)
            dispatch(setLobbyCode(code))
            onSuccess()
        }, 1000)
    
}