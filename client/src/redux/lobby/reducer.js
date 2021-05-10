import { DEFAULT_IS_PUBLIC, DEFAULT_N_TURNS, DEFAULT_LANGUAGE } from "../../util/global"

var initialState = {
    settings: {
        isPublic: DEFAULT_IS_PUBLIC,
        nTurns: DEFAULT_N_TURNS,
        language: DEFAULT_LANGUAGE
    },
    info: {
        code: null,
        users: [],
        isMyRoleAdmin: null
    },
    status: null,
    waitingAllSubmit: false,
    messages: [],
    receivedData: null,
    reports: []
}

const lobbyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_IS_PUBLIC': state.settings.isPublic = action.payload; return state;
        case 'SET_N_TURNS': state.settings.nTurns = action.payload; return state;
        case 'SET_LANGUAGE': state.settings.language = action.payload; return state;
        case 'SET_LOBBY_CODE': state.info.code = action.payload; return state;
        case 'SET_USERS': state.info.users = action.payload; return state;
        case 'SET_MY_ROLE_ADMIN': state.info.isMyRoleAdmin = action.payload; return state;
        case 'SET_STATUS': state.status = action.payload; return state;
        case 'SET_WAITING_ALL_SUBMITTED': state.waitingAllSubmit = action.payload; return state;
        case 'SET_MESSAGES': state.messages = action.payload; return state;
        case 'ADD_MESSAGE': state.messages.push(action.payload); state.messages = Array.from(state.messages); return state;
        case 'SET_RECEIVED_DATA': state.receivedData = action.payload; return state;
        case 'SET_REPORTS': state.reports = action.payload; return state;
        case 'ADD_SENTENCE': state.reports.forEach((report) => {if(report.id === action.payload.id_report) report.sentence.push(action.payload.sentence)}); return state;
        case 'ADD_DRAW': state.reports.forEach((report) => {if(report.id === action.payload.id_report) report.draw.push(action.payload.draw)}); return state;
        default: return state;
    }
}
export default lobbyReducer