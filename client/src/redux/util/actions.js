export const setEventbus = (eventbus) => {
    return {
        type: "SET_EVENTBUS",
        payload: eventbus
    }
}

export const setIsLoading = (isLoading) => {
    return {
        type: "SET_IS_LOADING",
        payload: isLoading
    }
}
