const Notification = require("../notification");

function createNotification(tile, description, date, idUser) {
    return new Notification({
        title: tile,
        description: description,
        date: date,
        id_user: idUser
    });
}

module.exports = {createNotification};