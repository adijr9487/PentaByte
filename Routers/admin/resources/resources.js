const router = require("express").Router();
const authController = require("../../../Controller/AuthController");
const clusterController = require("../../../Controller/ClusterController");
const errorHandler = require("../../../handler/error");
const Admin = require("../../../Models/Admin");
const Bins = require("../../../Models/Bins");

// Fetch bins for admin
router.post(
    "/bins/fetch",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            const bins = await Bins.find({
                admin: req.user._id,
            }).select("location");
            let coordinates = bins.locations.map((loc) => loc.coordinates);
            const clusters = clusterController.handleClusters(coordinates);
            res.status(200).json({
                locations: bins.location,
                clusters: clusters,
            });
        } catch (e) {
            errorHandler.handleInternalServer(res);
        }
    }
);

// Update bins for admin
router.post(
    "/bins/update",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
            if (!req.body.bins || req.body.bins.length === 0)
                return errorHandler.handleBadRequest(res);

            const locations = req.body.bins.map((l) => ({
                type: "Point",
                coordinates: l,
            }));

            const bin = await Bins.findOne({
                admin: req.user._id,
            });
            if (bin) {
                const updatedBin = await Bins.findOneAndUpdate(
                    {
                        admin: req.user._id,
                    },
                    {
                        location: locations,
                    }
                );
                return res.status(200).json({
                    bin: updatedBin,
                });
            } else {
                const newBin = new Bins({
                    admin: req.user._id,
                    location: locations,
                });
                await newBin.save();
                return res.status(200).json({
                    bin: newBin,
                });
            }
        } catch (e) {
            errorHandler.handleInternalServer(res);
        }
    }
);

// Allocate Resources for admin
router.post(
    "/allocate",
    authController.isAuthenticatedAdmin,
    async (req, res) => {
        try {
        } catch (e) {
            errorHandler.handleInternalServer(res);
        }
    }
);

module.exports = router;
