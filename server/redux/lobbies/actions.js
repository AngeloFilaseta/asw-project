const put = (key, value) => {
    return {
        type: "PUT_LOBBIES",
        key: key,
        value: value
    }
}

const get = (key) => {
    return {
        type: "GET_LOBBIES",
        key: key,
    }
}

const remove = (key) => {
    return {
        type: "REMOVE_LOBBIES",
        key: key,
    }
}

const keys = () => {
    return {
        type: "KEYS_LOBBIES"
    }
}

module.exports = {put};