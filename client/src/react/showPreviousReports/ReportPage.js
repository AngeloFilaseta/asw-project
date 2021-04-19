import GuessrNavbar from "../common/navbar/GuessrNavbar"
import ReportCard from "./ReportCard"
import { Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { useSelector } from "react-redux"
import BackButton from "../common/BackButton"
import { NotificationContainer } from "react-notifications"

export default function ReportPage() {

    var username = useSelector(state => state.username);
    var reportList = useSelector(state => state.previousReports);

    return (
        <>
            <NotificationContainer/>
            <GuessrNavbar title={"Report Collection"} />
            <div align="center">
                <div className="col-lg-2  col-6 my-3">
                    <BackButton destination={"home"} buttonName={"Go back"} />
                </div>
            </div>
            <Container fluid >
                <Row>
                    {updateList(reportList)}
                </Row>
            </Container>
        </>
    )
}

function updateList(reportList) {
    var i = 0
    return (
        <>
            {reportList.map(listitem => (
                <ReportCard
                    title={listitem.map.report_path}
                    handler={() => downloadFile(listitem.map.id)}
                    key={"report " + i++}
                />
            ))}
        </>
    );
}

function downloadFile(id) {
/*    var req = new XMLHttpRequest();
    req.open("GET", serverUrl + "/api/dw/report/" + id, true);
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
    req.send();*/
}
