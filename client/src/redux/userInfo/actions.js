export const setUsername = (username) => {
    return {
        type: "SET_USERNAME",
        payload: username
    };
}

export const setId = (id) => {
    return {
        type: "SET_ID",
        payload: id
    };
}

export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        payload: token
    };
}

export const setNotifications = (notifications) => {
    return {
        type: "SET_NOTIFICATIONS",
        payload: notifications
    };
}

