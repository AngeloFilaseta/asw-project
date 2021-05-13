import { useDispatch, useSelector } from "react-redux"

import PhaseTypes from "../../util/phaseType"
import Sentence from "./sentence/Sentence"
import Draw from "./draw/Draw"
import InsideLobby from "./insideLobby/InsideLobby"
import ShowReports from "./showReports/ShowReports"

export default function MainContent() {

    let dispatch = useDispatch()
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let report_to_id = useSelector(state => state.lobby.receivedData)
    let status = useSelector(state => state.lobby.status)

    switch (status) {
        case PhaseTypes.SENTENCE:
            return <Sentence dispatch={dispatch}
                waitingAllSubmit={waitingAllSubmit}
                socket={socket}
                id_user={id_user}
                lobbyCode={lobbyCode}
                report_to_id={report_to_id} />
        case PhaseTypes.DRAW:
            return <Draw dispatch={dispatch}
                waitingAllSubmit={waitingAllSubmit}
                socket={socket}
                id_user={id_user}
                lobbyCode={lobbyCode}
                report_to_id={report_to_id} />
        case PhaseTypes.INSIDE_LOBBY:
            return <InsideLobby />
        case PhaseTypes.SHOWING_REPORT:
            return <ShowReports />
        default:
            return <></>
    }

}