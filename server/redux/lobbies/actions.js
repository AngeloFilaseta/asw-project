const put = (key, value) => {
    return {
        type: "PUT",
        key: key,
        value: value
    }
}

module.exports = {put};