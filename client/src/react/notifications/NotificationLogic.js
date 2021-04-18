import $ from "jquery";
import {SERVER_ADDRESS} from "../../util/global";
import {setNotifications} from "../../redux/userInfo/actions";

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