import { combineReducers } from "redux"

import userInfoReducer from "./userInfo/reducer"
import utilReducer from "./util/reducer"
import lobbyReducer from "./lobby/reducer"
import previousReportsReducer from "./previousReports/reducer"

const allReducers = combineReducers({
    userInfo: userInfoReducer,
    util: utilReducer,
    lobby: lobbyReducer,
    previousReports: previousReportsReducer
})

export default allReducers