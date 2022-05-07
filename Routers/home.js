const router = require("express").Router();
const authController = require("../Controller/AuthController");
const errorHandler = require("../handler/error");
const Admin = require("../Models/Admin");
const Bins = require("../Models/Bins");

// Fetch bins
router.post("/bins/fetch", async (req, res) => {
    try {
        if (!req.body.zip)
            return errorHandler.handleBadRequest(res, "Invalid Zip Code");

        const admin = await Admin.findOne({ zip: req.body.zip });
        if (!admin)
            return errorHandler.handleNotFound(
                res,
                "No data found for the requested zip code."
            );

        const bins = await Bins.find({ admin: admin._id }).select("location");
        res.status(200).json({ locations: bins.location });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Update bins for admin
router.post("/bins", authController.isAuthenticatedAdmin, async (req, res) => {
    try {
        if (!req.body.bins || req.body.bins.length === 0)
            return errorHandler.handleBadRequest(res);

        const locations = req.body.bins.map((l) => ({
            type: "Point",
            coordinates: l,
        }));

        const bin = await Bins.findOne({ admin: req.user._id });
        if (bin) {
            const updatedBin = await Bins.findOneAndUpdate(
                {
                    admin: req.user._id,
                },
                {
                    location: locations,
                }
            );
            return res.status(200).json({ bin: updatedBin });
        } else {
            const newBin = new Bins({
                admin: req.user._id,
                location: locations,
            });
            await newBin.save();
            return res.status(200).json({ bin: newBin });
        }
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

module.exports = router;
