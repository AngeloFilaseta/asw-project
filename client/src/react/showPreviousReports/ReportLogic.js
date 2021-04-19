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


export function downloadFile(id) {
    /**
       var req = new XMLHttpRequest();
        req.open("GET", SERVER_ADDRESS + "/dw/report", true);
        req.responseType = "blob";
        req.onload = function (event) {
            var blob = req.response;
            var fileName = "report";
            if (req.getAllResponseHeaders().indexOf("Fake-Header") >= 0) {
                fileName = req.getResponseHeader("fileName");
            }
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        };
        req.send();
     */
}