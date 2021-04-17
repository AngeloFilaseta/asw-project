const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = User = mongoose.model("Notification", NotificationSchema);