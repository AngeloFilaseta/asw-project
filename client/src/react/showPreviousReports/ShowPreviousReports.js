import { useSelector } from "react-redux"

import { RedirectAuthentication } from "../common/GuessrRedirect"
import ReportPage from "./ReportPage"

export default function ShowPreviousReports(){
    return useSelector(state => state.userInfo.username) !== null ? <ReportPage /> : <RedirectAuthentication/>
}