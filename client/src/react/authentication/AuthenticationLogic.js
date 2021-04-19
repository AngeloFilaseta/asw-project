import { NotificationManager } from "react-notifications"
import {setIsLoading, setLanguages} from "../../redux/util/actions"
import {setUsername, setId, setToken, setNotifications} from "../../redux/userInfo/actions"
import $ from 'jquery';
import { SERVER_ADDRESS, USERNAME_LENGTH_MIN } from "../../util/global"
import {loadNotifications} from "../notifications/NotificationLogic";
import {setPreviousReports} from "../../redux/previousReports/actions";

$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
});

export function login(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername, "Login failed") /*check password*/){
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
    }
}

export function signup(inputUsername, inputPassword, dispatch) {
    if(isUsernameValid(inputUsername, "Signup failed") /*check password*/){
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
    }
}

function createUserObj(inputUsername, inputPassword) {
    return JSON.stringify({
        username: inputUsername,
        password: inputPassword
    });
}

function isUsernameValid(username, notificationTitle){
    return isStringLongEnough(username, USERNAME_LENGTH_MIN, notificationTitle, "Username must be at least " + USERNAME_LENGTH_MIN + " characters long")
}

function isStringLongEnough(str, len, notificationTitle, notificationText){
    if(str === undefined || str === null || str.trim().length < len){
        NotificationManager.warning(notificationText, notificationTitle, 3000);
        return false
    }
    return true
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




