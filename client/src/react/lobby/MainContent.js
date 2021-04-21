import { useSelector } from "react-redux"

import { RedirectHome } from "../common/GuessrRedirect"
import PhaseTypes from "../../util/phaseType"
import Sentence from "./sentence/Sentence"
import Draw from "./draw/Draw"
import InsideLobby from "./insideLobby/InsideLobby"

export default function MainContent(){

    var status = useSelector(state => state.lobby.status)
    switch (status) {
        case PhaseTypes.SENTENCE:
            return <Sentence />
        case PhaseTypes.DRAW:
            return <Draw />
        case PhaseTypes.INSIDE_LOBBY:
            return <InsideLobby />
        case PhaseTypes.SHOWING_REPORT:
            return <p>showing report</p>
        default:
            return <RedirectHome />
    }

}