export const setLanguages = (languages) => {
    return {
        type: "SET_LANGUAGES",
        payload: languages
    }
}

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
