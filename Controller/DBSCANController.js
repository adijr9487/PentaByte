const clustering = require("density-clustering");
const threshold = 25;

// DBSCAN
// locations : Array of coordinates
exports.dbscan = function (locations) {
    try {
        const scanner = new clustering.DBSCAN();
        const clusters = scanner.run(locations, 0.0025, 3);
        return clusters;
    } catch (e) {
        return new Error("Internal Server Error");
    }
};

// Get Clusters with large sizes
exports.getAbnormalClusters = function (clusters) {
    try {
        const abnormal = clusters.map((cluster) =>
            cluster.length > threshold ? cluster : null
        );
        return { abnormal, threshold };
    } catch (e) {
        return new Error("Internal Server Error");
    }
};
