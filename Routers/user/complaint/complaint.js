const router = require("express").Router();
const errorHander = require("../../../handler/error");
const authController = require("../../../Controller/AuthController");
const Complaint = require("../../../Models/Complaint");

// Get all complaints for a user
router.post("/fetch", authController.isAuthenticated, async (req, res) => {
    try {
        if (!req.body._id)
            return errorHandler.handleBadRequest(res, "Invalid data");

        const complaints = await Complaint.find({
            user: req.user._id,
        });
        res.status(200).json({ complaints });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

// Post complaint for user
router.post("/register", authController.isAuthenticated, async (req, res) => {
    try {
        if (
            !req.body.zip ||
            !req.body.title ||
            !req.body.description ||
            !req.body.location ||
            !req.body._id
        )
            return errorHandler.handleBadRequest(res, "Invalid data");

        const complaint = new Complaint({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
            location: { type: "Point", coordinates: req.body.location },
            zip: req.body.zip,
        });
        let error = complaint.validateSync();
        console.log(error);
        await complaint.save();
        res.status(200).json({ complaint });
    } catch (e) {
        errorHander.handleInternalServer(res);
    }
});

module.exports = router;
