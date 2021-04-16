import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Authentication from "../authentication/Authentication"
import HomePage from "../homepage/HomePage"

//import LobbyCreation from "../lobbycreation/LobbyCreation"
//import Template from "../lobby/Template"
//import ReportPage from "../showreport/ReportPage"

export default function GuessrRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </Router>
  );
}

/*
  <Route path="/show-report" component={ReportPage} />
  <Route path="/lobby" component={Template} />
  <Route path="/lobby-creation" component={LobbyCreation} />
*/