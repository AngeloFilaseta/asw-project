import $ from "jquery";
import {SERVER_ADDRESS} from "../../util/global";
import {setPreviousReports} from "../../redux/previousReports/actions";

export function loadPreviousReports(dispatch, token){
    $.ajax({
        url: SERVER_ADDRESS + "/report",
        type: 'GET',
        headers: {"Authorization": token}
    }).done(function (result) {
        dispatch(setPreviousReports(result));
    });
}

export function downloadFile(id, fileName, token) {
    let req = new XMLHttpRequest();
    req.open("GET", SERVER_ADDRESS + "/dw/report?id_report="+ id, true);
    req.withCredentials = true;
    req.setRequestHeader("Authorization", token);
    req.responseType = "blob";
    req.onload = function (event) {
        let blob = req.response;
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };
    req.send();
}