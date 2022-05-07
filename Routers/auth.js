const router = require("express").Router();
const authController = require("../Controller/AuthController");

// Signin for user
router.post("/user/signin", authController.signin);

// Signup for user
router.post("/user/signup", authController.signup);

// Signin for admin
router.post("/admin/signin", authController.adminSignin);

// Signup for admin
router.post("/admin/signup", authController.adminSignup);

// Logout
router.post("/logout", authController.logout);

module.exports = router;
