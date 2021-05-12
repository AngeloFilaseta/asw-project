import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap"
import PlayerTypes from "../../../util/playerType"
import { sendEndReport } from "../LobbyLogic"
import ReportEntry from "./ReportEntry";

export default function ShowReports() {

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let reports = useSelector(state => state.lobby.reports)
    let isAdmin = useSelector(state => state.lobby.info.isMyRoleAdmin)

    return (
        <div className="mx-3" style={{ overflowY: "scroll", height: "80vh" }}>
            {reportShow(reports)}
            {isAdmin === PlayerTypes.ADMIN &&
                <Button block className="mt-3" size="lg"
                    onClick={() => sendEndReport(dispatch, socket, id_user, lobbyCode)}>
                    Back to Lobby
                    </Button>
            }
        </div>)
}

function reportShow(reports) {
    return (reports.map((report, index) => (
        <div className={"py-1"} key={"report " + index}>
            <ReportEntry username={report.username}
                sentences={report.sentence}
                draws={report.draw} />
        </div>
    )));
}