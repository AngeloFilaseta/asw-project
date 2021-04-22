const put = (key, value) => {
    return {
        type: "PUT_LOBBIES",
        key: key,
        value: value
    }
}

const remove = (key) => {
    return {
        type: "REMOVE_LOBBIES",
        key: key,
    }
}


module.exports = {put, remove};