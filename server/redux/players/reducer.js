const playersReducer = (state = new Map(), action) => {
    switch (action.type) {
        case "PUT_PLAYERS" :
            state.set(action.key, action.value);
            return state;
        case "GET_PLAYERS" :
            state.get(action.key);
            return state;
        case "REMOVE_PLAYERS" :
            state.delete(action.key);
            return state;
        default:
            return state;
    }
}

module.exports = playersReducer;