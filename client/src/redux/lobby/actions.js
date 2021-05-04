export const setIsPublic = (isPublic) => {
    return {
        type: "SET_IS_PUBLIC",
        payload: isPublic
    }
}

export const setNTurns = (nTurns) => {
    return {
        type: "SET_N_TURNS",
        payload: nTurns
    }
}

export const setLanguage = (language) => {
    return {
        type: "SET_LANGUAGE",
        payload: language
    }
}

export const setLobbyCode = (code) => {
    return {
        type: "SET_LOBBY_CODE",
        payload: code
    }
}

export const setStatus = (status) => {
    return {
        type: "SET_STATUS",
        payload: status
    }
}

export const setUsers = (users) => {
    return {
        type: "SET_USERS",
        payload: users
    }
}

export const setMessages = (messages) => {
    return {
        type: "SET_MESSAGES",
        payload: messages
    }
}

export const addMessage = (message) => {
    return {
        type: "ADD_MESSAGE",
        payload: message
    }
}

export const setMyRoleAdmin = (role) => {
    return {
        type: "SET_MY_ROLE_ADMIN",
        payload: role
    }
}

export const setReceivedData = (receivedData) => {
    return {
        type: "SET_RECEIVED_DATA",
        payload: receivedData
    }
}

export const setWaitingAllSubmitted = (allSubmitted) => {
    return {
        type: "SET_WAITING_ALL_SUBMITTED",
        payload: allSubmitted
    }
}

export const setReports = (reports) => {
    return {
        type: "SET_REPORTS",
        payload: reports
    }
}

export const addSentence = (report) => {
    return {
        type: "ADD_SENTENCE",
        payload: report
    }
}

export const addDraw = (report) => {
    return {
        type: "ADD_DRAW",
        payload: report
    }
}
