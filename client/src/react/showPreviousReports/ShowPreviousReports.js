import { useSelector } from "react-redux"

import { RedirectAuthentication } from "../common/GuessrRedirect"
import ReportsPage from "./ReportsPage"

export default function ShowPreviousReports(){
    return useSelector(state => state.userInfo.username) !== null ? <ReportsPage /> : <RedirectAuthentication/>
}