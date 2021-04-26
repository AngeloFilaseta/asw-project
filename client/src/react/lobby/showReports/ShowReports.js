import { useSelector, useDispatch } from "react-redux"

import SVG from "react-inlinesvg"
import { Button, Collapse } from "react-bootstrap"
import $ from "jquery"

import PlayerTypes from "../../../util/playerType"
import {sendEndReport} from "../LobbyLogic"

export default function ShowReports(){
    
    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let reports = useSelector(state => state.lobby.reports)
    let isAdmin = useSelector(state => state.lobby.info.isMyRoleAdmin)

    if (isAdmin === PlayerTypes.ADMIN) {
        return (
            <div className="">
                <div className="mx-3">
                    <Button block className="mt-3" size="lg" onClick={() => sendEndReport(dispatch, socket, id_user, lobbyCode)}>Back to Lobby</Button>
                </div>
                {reportShow(reports)}
            </div>
        )
    } else {
        return (
            <div className="mx-3">
                {reportShow(reports)}
            </div>
        )
    }
}

function reportShow(reports) {

    let i = 0;
    let j = 0;

    return (
        <>
            {reports.map((report, index) => (
                <div key={"report " + i++}>
                    <br />
                    <Button block size="lg" variant="info" onClick={() => handleCollapse(index)}
                        aria-controls={"collapse-div-" + index}
                        aria-expanded={false}
                    >
                        Show {report.username}'s report
                    </Button>
                    <Collapse>
                        <div id={"collapse-div-" + index} className="border border-info rounded " align="center">
                            {alternateListsElements(report.sentences, report.draws).map((entry, index) => (
                                index % 2 === 0 ? <h2 key={"entry " + j++}>"{entry}"</h2> : <SVG src={entry} key={"entry " + j++}/>
                            ))}
                        </div>
                    </Collapse>
                </div>
            ))}
        </>
    );
}

function handleCollapse(index) {
    $('#collapse-div-' + index).collapse('toggle');
}


function alternateListsElements(sentence, draw) {
    let run = 0, first = 0, second = 0;
    const newArr = [];
    while (run < sentence.length + draw.length) {
        if (first > second) {
            newArr[run] = draw[second];
            second++;
        } else {
            newArr[run] = sentence[first];
            first++;
        }
        run++;
    }
    return newArr;
}