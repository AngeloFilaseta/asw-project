import { NotificationManager } from "react-notifications"
import {setIsLoading, setLanguages} from "../../redux/util/actions"
import {setUsername, setId, setToken, setNotifications} from "../../redux/userInfo/actions"
import $ from 'jquery';
import {
    PASSWORD_DIGITS_MIN,
    PASSWORD_LENGTH_MIN, PASSWORD_VALIDATION_MESSAGES,
    PASSWORDS_BLACKLIST,
    USERNAME_LENGTH_MIN
} from "./util"
import {loadNotifications} from "../notifications/NotificationLogic";
import {sleep} from "../../util/sleep";
import PasswordValidator from "password-validator"
import {SERVER_ADDRESS} from "../../util/global";
const pwSchema = new PasswordValidator();
pwSchema.is().min(PASSWORD_LENGTH_MIN)
        .has().uppercase()
        .has().lowercase()
        .has().digits(PASSWORD_DIGITS_MIN)
        .is().not().oneOf(PASSWORDS_BLACKLIST);

$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
});

export function login(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername)) {
        if (inputPassword !== null && inputPassword !== undefined && inputPassword !== "" ) {
            dispatch(setIsLoading(true))
            $.post(SERVER_ADDRESS + "/auth/login", createUserObj(inputUsername.trim(), inputPassword.trim()))
                .done(function (result) {
                    let token = result.token;
                    dispatch(setToken(token))
                    loadUserIDAndUsernameFromToken(dispatch, token);
                    loadLanguages(dispatch, token);
                    loadNotifications(dispatch, token);
                })
                .fail(function (result) {
                    if(result.responseJSON !== undefined){
                        NotificationManager.error(result.responseJSON.message, 'Error', 3000);
                    } else {
                        NotificationManager.error("Server unreachable", 'Error', 3000);
                    }
                    dispatch(setIsLoading(false));
                })
        } else {
            NotificationManager.error("Something is wrong with the password, please try again.", 'Invalid Password', 3000);
        }
    } else {
        NotificationManager.error("Something is wrong with the username, please try again.", 'Invalid Username', 3000);
    }
}

export function signup(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername)) {
       let invalidPasswordParams = getPasswordInvalidParams(inputPassword)
       if(invalidPasswordParams.length === 0) {
           dispatch(setIsLoading(true));
           $.post(SERVER_ADDRESS + "/auth/signup", createUserObj(inputUsername.trim(), inputPassword.trim()))
               .done(function () {
                   login(inputUsername,inputPassword, dispatch);
               })
               .fail(function (result) {
                    if(result.responseJSON !== undefined){
                        NotificationManager.error(result.responseJSON.message, 'Error', 3000);
                    } else {
                        NotificationManager.error("Server unreachable", 'Error', 3000);
                    }
                    dispatch(setIsLoading(false));
               })
       } else {
           printPasswordValidationErrors(invalidPasswordParams)
       }
    }else {
        NotificationManager.error("Username is not long enough, at least " + USERNAME_LENGTH_MIN + " characters needed.", 'Invalid Username', 3000);
    }
}

 export async function logout(dispatch) {
    dispatch(setUsername(null))
    dispatch(setToken(null))
    dispatch(setNotifications([]))
    await sleep(1000).then(() => NotificationManager.success('See you soon :)', 'Logout was successful'))
}
function createUserObj(inputUsername, inputPassword) {
    return JSON.stringify({
        username: inputUsername,
        password: inputPassword
    });
}

function isUsernameValid(str){
    return isStringLongEnough(str, USERNAME_LENGTH_MIN)
}

function getPasswordInvalidParams(str){
     return pwSchema.validate(str, { list: true })
}

function isStringLongEnough(str, len){
    return !(str === undefined || str === null || str.trim().length < len);

}

function loadUserIDAndUsernameFromToken(dispatch, token){
    $.ajax({
        url: SERVER_ADDRESS + "/profile",
        type: 'GET',
        headers: {"Authorization": token}
    }).done(function (result) {
        dispatch(setId(result.id));
        dispatch(setUsername(result.username));
    });
}

function loadLanguages(dispatch, token){
    $.ajax({
        url: SERVER_ADDRESS + "/languages",
        type: 'GET',
        headers: {"Authorization": token}
    }).done(function (result) {
        dispatch(setLanguages(result));
    })
    .always(function () {
        dispatch(setIsLoading(false));      
    });
}

function printPasswordValidationErrors(invalidPasswordParams){
    let messages = invalidPasswordParams.map(p => PASSWORD_VALIDATION_MESSAGES[p])
    messages.forEach(m => NotificationManager.error(m, 'Invalid Password', 10000))
}
