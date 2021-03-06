import ReportCard from "./ReportCard"
import { Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import {useDispatch, useSelector} from "react-redux"
import BackButton from "../common/BackButton"
import { NotificationContainer } from "react-notifications"
import {downloadFile, loadPreviousReports} from "./ReportLogic"
import {setIsLoading} from "../../redux/util/actions"
import GuessrNavbar from "../common/navbar/GuessrNavbar"
import {useEffect} from "react";

export default function ReportPage() {

    let dispatch = useDispatch()
    let token = useSelector(state => state.userInfo.token)
    let reportList = useSelector(state => state.previousReports)

    //TODO ADD ROTELLINA
    useEffect(() => {
        dispatch(setIsLoading(true))
        loadPreviousReports(dispatch, token)
        dispatch(setIsLoading(false))
    }, [dispatch, token]);

    return (
        <>
            <NotificationContainer/>
            <GuessrNavbar title={"Report Collection"} />
            <div align="center">
                <div role="region" className="col-lg-2  col-6 my-3">
                    <BackButton destination={"home"} buttonName={"Go back"} />
                </div>
            </div>
            <Container fluid role="main">
                <Row>
                    {updateList(reportList, token)}
                </Row>
            </Container>
        </>
    )
}

function updateList(reportList, token) {
    return (
        <>
            {reportList.map(item => (
                <ReportCard
                    title={item.report_name}
                    handler={() => downloadFile(item._id, item.report_name, token)}
                    key={item._id}
                />
            ))}
        </>
    );
}

