const express = require("express");
const { registerOrLogin, checkSession, logout } = require("../controller/authController");

const router = express.Router();

router.post("/submit", registerOrLogin);
router.get("/check-session", checkSession);
router.post("/logout", logout);

module.exports = router;
