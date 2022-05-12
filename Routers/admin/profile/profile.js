const router = require("express").Router();
const authController = require("../../../Controller/AuthController");
const errorHander = require("../../../handler/error");
const Admin = require("../../../Models/Admin");

// Fetch admin profile
router.post("/fetch", authController.isAuthenticatedAdmin, (req, res) => {
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Update admin profile
router.post(
    "/update",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            const user = await Admin.findByIdAndUpdate(req.user._id, {
                name: req.body.name || req.user.name,
                avatar: req.body.avatar || req.user.avatar,
                pickups: req.body.pickups || req.user.pickups,
            });
            res.status(200).json({ user });
        } catch (e) {
            errorHander.handleInternalServer(res);
        }
    }
);

module.exports = router;
