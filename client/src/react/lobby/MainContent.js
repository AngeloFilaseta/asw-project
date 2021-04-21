import { useSelector } from "react-redux"

import { RedirectHome } from "../common/GuessrRedirect"
import PhaseTypes from "../../util/phaseType"
import InsideLobby from "./insideLobby/InsideLobby"

export default function MainContent(){

    var status = useSelector(state => state.lobby.status)

    switch (status) {
        case PhaseTypes.SENTENCE:
            return <p>sentence</p>
        case PhaseTypes.DRAW:
            return <p>draw</p>
        case PhaseTypes.INSIDE_LOBBY:
            return <InsideLobby />
        case PhaseTypes.SHOWING_REPORT:
            return <p>showing report</p>
        default:
            return <RedirectHome />
    }

}