const express = require('express');
const router = express.Router();
const ResourceController = require("../controller/resources")

router.get("/languages", (req, res) => ResourceController.getLanguages(req, res));

module.exports = router;