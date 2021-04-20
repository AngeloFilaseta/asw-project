const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    time_start: {
        type: Date,
        require: true
    },
    time_end: {
        type: Date,
        require: true
    },
    user_in_games: {
        type: Schema.Types.ObjectId,
        ref: "UserInGame"
    }
});

module.exports = mongoose.model("Game", GameSchema);

