import { NotificationManager } from "react-notifications"
import {setUsername} from "../../redux/userInfo/actions"

export function connectionErrorHandler(error, socket, dispatch) {
    socket.disconnect()
    dispatch(setUsername(null))
    NotificationManager.error("Connection to server lost", 'Error')
}