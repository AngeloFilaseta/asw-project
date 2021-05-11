import {setStatus} from "../../redux/lobby/actions";
import PhaseTypes from "../../util/phaseType";
import ReportSounds from "../../sound/reports.mp3";
import {createNotificationRequest} from "../../react/notifications/NotificationLogic";

export function showReportHandler(state, dispatch) {
    dispatch(setStatus(PhaseTypes.SHOWING_REPORT))
    new Audio(ReportSounds).play().then(/* does nothing */)
    createNotificationRequest(
        dispatch,
        state.userInfo.id,
        state.userInfo.token,
        "New reports are available!",
        "Check the Previous report section."
    )
}