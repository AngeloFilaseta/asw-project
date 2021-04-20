const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserInGameSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    id_game: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    },
    report_name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("UserInGame", UserInGameSchema);
