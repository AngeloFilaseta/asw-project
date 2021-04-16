const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const logger = require("../middleware/log");
const AuthController = require("../controller/auth")

router.use(logger)

router.post("/auth/signup",(req, res) => AuthController.signup(req, res));

router.post("/auth/login", (req, res) => AuthController.login(req, res));

router.get("/profile", auth, (req, res) => AuthController.getProfile(req, res));

module.exports = router;