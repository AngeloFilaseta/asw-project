import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Authentication from "../authentication/Authentication"
import HomePage from "../homepage/HomePage"
import Lobby from "../lobby/Lobby"

//import LobbyCreation from "../lobbycreation/LobbyCreation"
//import Template from "../lobby/Template"
//import ReportPage from "../showreport/ReportPage"

export default function GuessrRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/home" component={HomePage} />
        <Route path="/lobby" component={Lobby} />
      </Switch>
    </Router>
  );
}

/*
  <Route path="/show-report" component={ReportPage} />
  <Route path="/lobby-creation" component={LobbyCreation} />
*/