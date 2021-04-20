const User = require("../user");

function createUser(username, pw) {
    return new User({
        username: username,
        password: pw
    });
}

module.exports = {createUser}