const lobbiesReducer = (state = new Map(), action) => {
    switch (action.type){
        case "PUT" : state.set(action.key, action.value); return state;
        default: return state;
    }
}

module.exports = lobbiesReducer;