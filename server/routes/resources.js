const express = require('express');
const router = express.Router();
const ResourceController = require("../controller/resources")

router.get("/languages", (req, res) => ResourceController.getLanguages(req, res));

router.get("/dw/report", (req, res) => ResourceController.downloadReport(req, res));

module.exports = router;