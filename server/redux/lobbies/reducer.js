const lobbiesReducer = (state = new Map(), action) => {
    switch (action.type) {
        case "PUT_LOBBIES" :
            state.set(action.key, action.value);
            return state;
        case "GET_LOBBIES" :
            state.get(action.key);
            return state;
        case "REMOVE_LOBBIES" :
            state.delete(action.key);
            return state;
        default:
            return state;
    }
}

module.exports = lobbiesReducer;