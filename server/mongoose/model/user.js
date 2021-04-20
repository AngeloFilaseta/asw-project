const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    notifications: [{
        type: Schema.Types.ObjectId,
        ref:"Notification"
    }],
    user_in_games: [{
        type: Schema.Types.ObjectId,
        ref:"UserInGame"
    }]
});

//authenticate input against database
UserSchema.statics.authenticate = function(name, password, callback) {
    User.findOne({ username: name }).exec(function(err, user) {
        if (err) {
            return callback(err);
        } else if (!user) {
            let err = new Error("User not found.");
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
    });
};

//hashing a password before saving it to the database
UserSchema.pre("save", function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);