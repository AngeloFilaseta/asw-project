const express = require('express');
const router = express.Router();
const NotificationController = require("../controller/notifications")
const auth = require("../middleware/auth");

router.get("/notification", auth, (req, res) => NotificationController.getNotifications(req, res));

router.post("/notification", auth, (req, res) => NotificationController.createNotification(req, res));

router.delete("/notification", auth, (req, res) => NotificationController.deleteNotification(req, res));

module.exports = router;