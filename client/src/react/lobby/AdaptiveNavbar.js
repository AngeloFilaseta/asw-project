import { useSelector } from "react-redux"
import PhaseTypes from "../../util/phaseType"

import GuessrNavbar from  "../common/navbar/GuessrNavbar"

export default function AdaptiveNavbar(){

    var status = useSelector(state => state.lobby.status)
    var isPublic = useSelector(state => state.lobby.settings.isPublic)
    var lobbyCode = useSelector(state => state.lobby.info.code)

    switch (status) {
        case PhaseTypes.SENTENCE:
            return (<GuessrNavbar title={""} subtitle={"writing"} />);
        case PhaseTypes.DRAW:
            return (<GuessrNavbar title={""} subtitle={"drawing"} />);
        case PhaseTypes.INSIDE_LOBBY:
            return (<GuessrNavbar title={isPublic ? "Public Lobby: " : "Private Lobby: "} subtitle={lobbyCode} />);
        case PhaseTypes.SHOWING_REPORT:
            return (<GuessrNavbar title={""} subtitle={"reports"} />);
        default:
            return (<GuessrNavbar title={"ERROR"} subtitle={"Unhandled status"} />);
    }
}