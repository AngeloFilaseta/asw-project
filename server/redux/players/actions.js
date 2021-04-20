const put = (key, value) => {
    return {
        type: "PUT_PLAYERS",
        key: key,
        value: value
    }
}

const get = (key) => {
    return {
        type: "GET_PLAYERS",
        key: key,
    }
}

const contains = (key) => {
    return {
        type: "CONTAINS_PLAYERS",
        key: key,
    }
}

const remove = (key) => {
    return {
        type: "REMOVE_PLAYERS",
        key: key,
    }
}

const keys = () => {
    return {
        type: "KEYS_PLAYERS"
    }
}

module.exports = {put};