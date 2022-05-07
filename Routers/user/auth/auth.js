const router = require("express").Router();
const authController = require("../../../Controller/AuthController");

// Signin for user
router.post("/signin", authController.signin);

// Signup for user
router.post("/signup", authController.signup);

// Logout
router.post("/logout", authController.logout);

module.exports = router;
