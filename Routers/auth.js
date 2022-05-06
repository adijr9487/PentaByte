const router = require("express").Router;
const authController = require("../Controller/AuthController");

router.post('/user/signin', authController.signin);

router.post('/user/signup', authController.signup);

router.post('/admin/signin', authController.adminSignin);

router.post('/admin/signup', authController.adminSignup);

router.post('/logout', authController.logout);

module.exports = router