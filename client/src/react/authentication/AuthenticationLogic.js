import { NotificationManager } from "react-notifications"

import { setIsLoading } from "../../redux/util/actions"
import { setUsername, setId } from "../../redux/userInfo/actions"

import { 
    SERVER_ADDRESS, 
    USERNAME_LENGHT_MIN 
} from "../../util/global"

export function login(inputUsername, inputPassword, dispatch) {
    /*
    .done(function (result) {
        dispatch(setId(result.message.message.id_user));
        dispatch(setUsername(inputUsername));
    })
    */
    if(isUsernameValid(inputUsername, "Login failed") /*check password*/){
        dispatch(setIsLoading(true))
        setTimeout(function () {
            dispatch(setIsLoading(false))
            //TODO try login
            console.log(inputUsername)
            console.log(inputPassword)
            console.log(SERVER_ADDRESS)
            dispatch(setId(69420));
            dispatch(setUsername(inputUsername))
        }, 1000)
    }
}

export function signup(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername, "Signup failed") /*check password*/){
        dispatch(setIsLoading(true))
        setTimeout(function () {
            dispatch(setIsLoading(false))
            //TODO try signup
            console.log(inputUsername)
            console.log(inputPassword)
            dispatch(setId(69420));
            dispatch(setUsername(inputUsername))
        }, 1000)
    }
}

/*
function createUserObj(inputUsername, inputPassword) {
    return JSON.stringify({
        username: inputUsername,
        password: inputPassword
    });
}
*/

function isUsernameValid(username, notificationTitle){
    return isStringLongEnough(username, USERNAME_LENGHT_MIN, notificationTitle, "Username must be at least " + USERNAME_LENGHT_MIN + " characters long")
}

function isStringLongEnough(str, len, notificationTitle, notificationText){
    if(str === undefined || str === null || str.trim().length < len){
        NotificationManager.warning(notificationText, notificationTitle, 3000);
        return false
    }
    return true
}