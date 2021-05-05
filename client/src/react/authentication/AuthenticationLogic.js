import { NotificationManager } from "react-notifications"
import {setIsLoading, setLanguages} from "../../redux/util/actions"
import {setUsername, setId, setToken} from "../../redux/userInfo/actions"
import $ from 'jquery';
import {PASSWORD_LENGTH_MIN, SERVER_ADDRESS, USERNAME_LENGTH_MIN} from "../../util/global"
import {loadNotifications} from "../notifications/NotificationLogic";

$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
});

export function login(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername)) {
        if (isPasswordValid(inputPassword)) {
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
                    NotificationManager.error(result.responseJSON.message, 'Error', 3000);
                })
                .always(function () {
                    dispatch(setIsLoading(false));
                });
        } else {
            NotificationManager.error("Something is wrong with the password, please try again.", 'Invalid Password', 3000);
        }
    } else {
        NotificationManager.error("Something is wrong with the username, please try again.", 'Invalid Username', 3000);
    }
}

export function signup(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername)) {
       if(isPasswordValid(inputPassword)) {
           dispatch(setIsLoading(true));
           $.post(SERVER_ADDRESS + "/auth/signup", createUserObj(inputUsername.trim(), inputPassword.trim()))
               .done(function () {
                   login(inputUsername,inputPassword, dispatch);
               })
               .fail(function (result) {
                   NotificationManager.error(result.responseJSON.message, 'Error', 3000);
               })
               .always(function () {
                   dispatch(setIsLoading(false));
               });
       } else {
           NotificationManager.error("Password is not long enough, at least " + PASSWORD_LENGTH_MIN + " characters needed.", 'Invalid Password', 3000);
       }
    }else {
        NotificationManager.error("Username is not long enough, at least " + USERNAME_LENGTH_MIN + " characters needed.", 'Invalid Username', 3000);
    }
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

function isPasswordValid(str){
    return isStringLongEnough(str, PASSWORD_LENGTH_MIN)
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
    });
}




