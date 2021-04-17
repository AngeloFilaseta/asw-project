import { NotificationManager } from "react-notifications"
import { setIsLoading } from "../../redux/util/actions"
import {setUsername, setId, setToken} from "../../redux/userInfo/actions"
import $ from 'jquery';

import { 
    SERVER_ADDRESS, 
    USERNAME_LENGHT_MIN 
} from "../../util/global"

export function login(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername, "Login failed") /*check password*/){
        dispatch(setIsLoading(true))
        setTimeout(function () {
            dispatch(setIsLoading(false))
            $.post(SERVER_ADDRESS + "/auth/login", createUserObj(inputUsername.trim(), inputPassword.trim()))
                .done(function (result) {
                    dispatch(setToken(result.token))
                    $.ajax({
                        url: SERVER_ADDRESS + "/profile",
                        type: 'GET',
                        headers: {"Authorization": result.token}
                    }).done(function (result) {
                        dispatch(setId(result.id));
                        dispatch(setUsername(result.username));
                    });
                })
                .fail(function (result) {
                    NotificationManager.error(result.responseJSON.message, 'Error', 3000);
                })
                .always(function () {
                    dispatch(setIsLoading(false));
                });
        }, 1000)
    }
}

export function signup(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername, "Signup failed") /*check password*/){
        dispatch(setIsLoading(true));
        $.ajaxSetup({
            contentType: "application/json; charset=utf-8"
        });
        $.post(SERVER_ADDRESS + "/auth/signup", createUserObj(inputUsername.trim(), inputPassword.trim()))
            .done(function (result) {
                dispatch(setId(result._id));
                dispatch(setUsername(result.username));
            })
            .fail(function (result) {
                NotificationManager.error(result.responseJSON.message, 'Error', 3000);
            })
            .always(function () {
                dispatch(setIsLoading(false));
            });
    }
}


function createUserObj(inputUsername, inputPassword) {
    return JSON.stringify({
        username: inputUsername,
        password: inputPassword
    });
}


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

