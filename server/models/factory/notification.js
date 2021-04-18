const Notification = require("../notification");

function createNotification(tile, description, idUser) {
    return new Notification({
        title: tile,
        description: description,
        id_user: idUser
    });
}

module.exports = {createNotification};