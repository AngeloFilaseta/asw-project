export const setLanguages = (languages) => {
    return {
        type: "SET_LANGUAGES",
        payload: languages
    }
}

export const setSocket = (socket) => {
    return {
        type: "SET_SOCKET",
        payload: socket
    }
}

export const setIsLoading = (isLoading) => {
    return {
        type: "SET_IS_LOADING",
        payload: isLoading
    }
}
