import {setReceivedData, setStatus, setWaitingAllSubmitted} from "../../redux/lobby/actions";
import NextPhaseSound from "../../sound/next_phase.mp3";
import {NotificationManager} from "react-notifications";
import PhaseTypes from "../../util/phaseType";

export function sentenceHandler(id_next_user, dispatch) {
    dispatch(setReceivedData(id_next_user))
    new Audio(NextPhaseSound).play().then(/* does nothing */)
    NotificationManager.info("Draw time!", '', 1500)
    dispatch(setStatus(PhaseTypes.DRAW))
    dispatch(setWaitingAllSubmitted(false))
}
