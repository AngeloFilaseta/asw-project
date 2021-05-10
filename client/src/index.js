import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-awesome-button/dist/styles.css"

import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"

import { Provider } from "react-redux"
import { createStore } from "redux"
import allReducers from "./redux"

import GuessRouter from "./react/common/GuessrRouter"

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <GuessRouter/>
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals()
