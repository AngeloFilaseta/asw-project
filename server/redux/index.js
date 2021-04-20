const Redux = require("redux");
const lobbiesReducer = require("./lobbies/reducer")
const playerReducer = require("./players/reducer")

const allReducers = Redux.combineReducers({
    lobbies: lobbiesReducer,
    players: playerReducer
})

module.exports = allReducers;
