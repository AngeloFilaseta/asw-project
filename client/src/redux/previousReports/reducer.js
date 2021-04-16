const previousReportsReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_PREVIOUS_REPORTS': state = action.payload; return state;
        default: return state
    }
}
export default previousReportsReducer