const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");

function createNotification(req, res) {
    Errors.ServerError(res, {message: "Not Implemented"});
}

function getNotifications(req, res) {
    Errors.ServerError(res, {message: "Not Implemented"});
}

function deleteNotification(req, res) {
    Errors.ServerError(res, {message: "Not Implemented"});
}

module.exports = {
    createNotification,
    getNotifications,
    deleteNotification
}