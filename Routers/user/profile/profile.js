const router = require("express").Router();
const authController = require("../../../Controller/AuthController");
const errorHander = require("../../../handler/error");
const User = require("../../../Models/User");

// Fetch user profile
router.post("/fetch", authController.isAuthenticated, (req, res) => {
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Update user profile
router.post("/update", authController.isAuthenticated, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name || req.user.name,
            avatar: req.body.avatar || req.user.avatar,
            location: req.body.location
                ? { type: "Point", coordinates: req.body.location }
                : req.user.location,
        });
        res.status(200).json({ user });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

module.exports = router;
