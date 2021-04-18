var initialState = {
    username: null,
    id: null,
    token: null,
    notifications: []
}

const userInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_USERNAME': state.username = action.payload; return state;
        case 'SET_ID': state.id = action.payload; return state;
        case 'SET_TOKEN': state.token = action.payload; return state;
        case 'SET_NOTIFICATIONS': state.notifications = action.payload; return state;
        default: return state;
    }
}

export default userInfoReducer