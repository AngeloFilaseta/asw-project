import {setReports, setStatus} from "../../redux/lobby/actions";
import PhaseTypes from "../../util/phaseType";

export function backToLobbyHandler(state, dispatch) {
    dispatch(setStatus(PhaseTypes.INSIDE_LOBBY))
    let reportsArray = []
    state.lobby.info.users.forEach((player) => {
        reportsArray.push(
            {
                id: player.id,
                username: player.username,
                sentence: [],
                draw: []
            }
        )
    })
    dispatch(setReports(reportsArray))
}