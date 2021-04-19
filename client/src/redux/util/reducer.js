var initialState = {
    languages: [],
    socket: null,
    isLoading: false
}

const utilReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_LANGUAGES': state.languages = action.payload; return state;
        case 'SET_SOCKET': state.socket = action.payload; return state;
        case 'SET_IS_LOADING': state.isLoading = action.payload; return state;
        default: return state;
    }
}

export default utilReducer