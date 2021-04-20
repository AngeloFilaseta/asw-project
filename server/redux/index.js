const Redux = require("redux");
const lobbiesReducer = require("./lobbies/reducer")

const allReducers = Redux.combineReducers({
    lobbies: lobbiesReducer
})

module.exports = allReducers;
