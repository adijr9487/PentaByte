const router = require("express").Router();
const authController = require("../../../Controller/AuthController");
const clusterController = require("../../../Controller/ClusterController");
const errorHandler = require("../../../handler/error");
const Admin = require("../../../Models/Admin");
const Bins = require("../../../Models/Bins");

// Fetch bins
router.post("/bins/fetch", async (req, res) => {
    try {
        if (!req.body.zip)
            return errorHandler.handleBadRequest(res, "Invalid Zip Code");

        const admin = await Admin.findOne({
            zip: req.body.zip,
        });
        if (!admin)
            return errorHandler.handleNotFound(
                res,
                "No data found for the requested zip code."
            );

        const bins = await Bins.find({
            admin: admin._id,
        }).select("location");
        res.status(200).json({
            locations: bins.location,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Fetch bins for user
router.post(
    "/bins/auth/fetch",
    authController.isAuthenticated,
    async (req, res) => {
        try {
            if (!req.body.zip || !req.body.location)
                return errorHandler.handleBadRequest(res, "Invalid Zip Code");

            const admin = await Admin.findOne({
                zip: req.body.zip,
            });
            if (!admin)
                return errorHandler.handleNotFound(
                    res,
                    "No data found for the requested zip code."
                );

            const bins = await Bins.find({
                admin: admin._id,
            }).select("location");
            let coordinates = bins.locations.map((loc) => loc.coordinates);
            const clusters = clusterController.handleClusters(coordinates);
            const userClusterIndex = clusterController.findCluster(
                clusters,
                coordinates
            );
            res.status(200).json({
                locations: bins.location,
                cluster: clusters[userClusterIndex],
            });
        } catch (e) {
            errorHandler.handleInternalServer(res);
        }
    }
);

module.exports = router;
