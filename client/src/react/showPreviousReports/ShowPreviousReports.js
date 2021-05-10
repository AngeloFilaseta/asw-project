import { useSelector } from "react-redux"

import { RedirectAuthentication } from "../common/GuessrRedirect"
import ReportPage from "./ReportPage"

import back from "../../img/background.svg"

export default function ShowPreviousReports(){
    return useSelector(state => state.userInfo.username) !== null ? <div style={{backgroundImage:`url(${back})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh' }}>
        <ReportPage />
    </div>   : <RedirectAuthentication/>
}