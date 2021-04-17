const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const Notification = require("../models/notification");

function createNotification(req, res) {
    let newNotification = new Notification({
        title: req.body.title,
        description: req.body.description
    });
    newNotification.save().then(() => {
        Responses.OKResponse(res, newNotification);
    }).catch(err => {
        Errors.ServerError(res, {message: err.message});
    });
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