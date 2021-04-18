const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../controller/auth")

router.post("/auth/signup",(req, res) => AuthController.signup(req, res));

router.post("/auth/login", (req, res) => AuthController.login(req, res));

router.get("/profile", auth, (req, res) => AuthController.getProfile(req, res));

module.exports = router;