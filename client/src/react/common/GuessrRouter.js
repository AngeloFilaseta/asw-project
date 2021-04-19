import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Authentication from "../authentication/Authentication"
import HomePage from "../homepage/HomePage"
import Lobby from "../lobby/Lobby"
import LobbyCreation from "../lobbyCreation/LobbyCreation";
import NotificationPage from "../notifications/NotificationPage"
import ShowPreviousReports from "../showPreviousReports/ShowPreviousReports"

//import Template from "../lobby/Template"
//import ReportPage from "../showreport/ReportPage"

export default function GuessrRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/home" component={HomePage} />
        <Route path="/lobby-creation" component={LobbyCreation} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/notifications" component={NotificationPage} />
        <Route path="/show-previous-reports" component={ShowPreviousReports} />
      </Switch>
    </Router>
  );
}

/*
  <Route path="/show-report" component={ReportPage} />
*/