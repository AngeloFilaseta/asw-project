import {useEffect} from "react"
import GuessrNavbar from "../common/navbar/GuessrNavbar"
import ReportCard from "./ReportCard"
import { Row } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import {useDispatch, useSelector} from "react-redux"
import BackButton from "../common/BackButton"
import { NotificationContainer } from "react-notifications"
import {downloadFile, loadPreviousReports} from "./ReportLogic"
import {setIsLoading} from "../../redux/util/actions";

export default function ReportPage() {

    const dispatch = useDispatch()
    let token = useSelector(state => state.userInfo.token)
    let reportList = useSelector(state => state.previousReports)

    //TODO ADD ROTELLINA
    useEffect(() => {
        dispatch(setIsLoading(true))
        loadPreviousReports(dispatch, token)
        dispatch(setIsLoading(false))
    }, []);

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

