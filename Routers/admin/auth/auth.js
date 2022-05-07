const router = require("express").Router();
const authController = require("../../../Controller/AuthController");

// Signin for admin
router.post("/signin", authController.adminSignin);

// Signup for admin
router.post("/signup", authController.adminSignup);

// Logout
router.post("/logout", authController.logout);

module.exports = router;
