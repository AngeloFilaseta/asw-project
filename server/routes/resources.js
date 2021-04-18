const express = require('express');
const router = express.Router();
const ResourceController = require("../controller/resources")
const auth = require("../middleware/auth");

router.get("/languages", auth, (req, res) => ResourceController.getLanguages(req, res));

router.post("/store/game", (req, res) => ResourceController.storeGame(req, res));

router.get("/dw/report", auth, (req, res) => ResourceController.downloadReport(req, res));

module.exports = router;