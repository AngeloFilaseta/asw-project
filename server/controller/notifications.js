const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const Notification = require("../models/notification");

function createNotification(req, res) {
    let newNotification = new Notification({
        title: req.body.title,
        description: req.body.description,
        id_user: req.body.id_user
    });
    newNotification.save().then(() => {
        Responses.OKResponse(res, newNotification);
    }).catch(err => {
        Errors.ServerError(res, {message: err.message});
    });
}

async function getNotifications(req, res) {
    await Notification.find({'id_user' : req.user.id}, function(err, notifications) {
        if (err) {
            Errors.ServerError(res, err.message);
        }
        Responses.OKResponse(res, notifications);
    });
}

async function deleteNotification(req, res) {
    await Notification.deleteOne({ _id:  req.query["id_notification"]}, function (err) {
        if (err) {
            Errors.ServerError(res, err.message);
        }
        Responses.AcceptedResponse(res, {message: "Notification deleted."})
    });
}

module.exports = {
    createNotification,
    getNotifications,
    deleteNotification
}