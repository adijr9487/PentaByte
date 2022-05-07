const router = require("express").Router();
const errorHander = require("../handler/error");
const authController = require("../Controller/AuthController");
const Complaint = require("../Models/Complaint");

// Get all complaints for a user
router.post("/user/fetch", authController.isAuthenticated, async (req, res) => {
    try {
        const complaints = await Complaint.find({
            user: req.user._id,
        });
        res.json({ complaints });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Get all complaints for the admin
router.post(
    "/admin/fetch",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            const complaints = await Complaint.find().populate({
                path: "user",
                select: "-password",
            });
            res.json({ complaints });
        } catch (e) {
            errorHander.handleInternalServer(res);
        }
    }
);

// Post complaint for user
router.post("/user", authController.isAuthenticated, async (req, res) => {
    try {
        const complaint = new Complaint({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            location: { type: "Point", coordinates: req.body.location },
        });
        await complaint.save();
        res.json({ complaint });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Update status for admin
router.post("/admin", authController.isAuthenticatedAdmin, async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.body._id, {
            status: req.body.status,
        });
        res.json({ complaint });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

module.exports = router;
