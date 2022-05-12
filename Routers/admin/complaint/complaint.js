const router = require("express").Router();
const errorHander = require("../../../handler/error");
const authController = require("../../../Controller/AuthController");
const Complaint = require("../../../Models/Complaint");

// Get all complaints for the admin
router.post("/fetch", authController.isAuthenticatedAdmin, async (req, res) => {
    try {
        const complaints = await Complaint.find({
            zip: req.user.zip,
        }).populate({
            path: "user",
            select: "-password",
        });
        res.status(200).json({ complaints });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Update status for admin
router.post(
    "/status/update",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            if (!req.body.status || !req.body._id)
                return errorHandler.handleBadRequest(res, "Invalid data");

            const complaint = await Complaint.findByIdAndUpdate(req.body._id, {
                status: req.body.status,
            });
            res.status(200).json({ complaint });
        } catch (e) {
            errorHander.handleInternalServer(res);
        }
    }
);

// Update severity for admin
router.post(
    "/severity/update",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            if (!req.body.tag || !req.body._id)
                return errorHander.handleBadRequest(res);

            const complaint = await Complaint.findByIdAndUpdate(req.body._id, {
                tag: req.body.tag,
            });
            res.status(200).json({ complaint });
        } catch (e) {
            errorHander.handleInternalServer(res);
        }
    }
);

module.exports = router;
