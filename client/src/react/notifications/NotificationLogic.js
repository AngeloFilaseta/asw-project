import $ from "jquery";
import {SERVER_ADDRESS} from "../../util/global";
import {setNotifications} from "../../redux/userInfo/actions";

export function createNotificationRequest(dispatch, id_user, token, title, description){
    $.ajax({
        url: SERVER_ADDRESS + "/notification",
        type: 'POST',
        headers: {"Authorization": token},
        data: JSON.stringify({"title": title, "description": description, "id_user": id_user})
    }).done(function () {
        loadNotifications(dispatch,token);
    });
}
export function deleteNotificationRequest(dispatch, token, idNotification){
    $.ajax({
        url: SERVER_ADDRESS + "/notification?id_notification=" + idNotification ,
        type: 'DELETE',
        headers: {"Authorization": token}
    }).done(function () {
        loadNotifications(dispatch,token);
    });
}

export function loadNotifications(dispatch, token){
    $.ajax({
        url: SERVER_ADDRESS + "/notification",
        type: 'GET',
        headers: {"Authorization": token}
    }).done(function (notifications) {
        dispatch(setNotifications(notifications));
    });
}

export function deleteAllNotifications(dispatch, token, idNotificationArray){
    idNotificationArray.forEach(id => deleteNotificationRequest(dispatch, token, id))
}