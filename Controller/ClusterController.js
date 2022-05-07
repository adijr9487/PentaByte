require("dotenv").config();
const clustering = require("density-clustering");
const KNN = require("ml-knn");

// Create the data 2D-array (vectors) describing the data

// zip
// zip --> admin
// admin --> bins
// bins --> location

const threshold = 24;

async function kMeanCluster(abnormal_coordinate) {
    const K_MEANS = new clustering.KMEANS();
    const K_OPTIMAL = Math.ceil(abnormal_coordinate.length / threshold);
    // parameters: 3 - number of clusters
    const CLUSTERS = K_MEANS.run(abnormal_coordinate, K_OPTIMAL);
    return CLUSTERS;
    /*
    RESULT:
    [
      [0,1,2,3,4,5],
      [6,7,9],
      [8]
    ]
    */
}

// DBSCAN
// locations : Array of coordinates
function dbscan(locations) {
    try {
        const scanner = new clustering.DBSCAN();
        const clusters = scanner.run(locations, 0.0025, 3);
        return clusters;
    } catch (e) {
        return new Error("Internal Server Error");
    }
}

// Get Clusters with large sizes
function getAbnormalClusters(clusters) {
    try {
        const abnormal = [],
            normal = [];
        clusters.forEach((cluster) =>
            cluster.length > threshold
                ? abnormal.push(cluster)
                : normal.push(cluster)
        );
        return {
            abnormal,
            normal,
        };
    } catch (e) {
        return new Error("Internal Server Error");
    }
}

//Get final cluster to user
exports.handleClusters = function (coordinates) {
    // zip admin bin

    try {
        let result = [];
        let cluster_dbscan = dbscan(coordinates);
        let { abnormal, normal } = getAbnormalClusters(cluster_dbscan);
        // const abnormal_cc = [];
        // const normal_cc = [];

        abnormal.forEach((ab_cluster) => {
            let temp = ab_cluster.map((ab_index) => {
                return coordinates[ab_index];
            });
            result = [...normal, ...kMeanCluster(temp)];
        });
        result = result.map((idx_arr) =>
            idx_arr.map((idx) => coordinates[idx])
        );
        return result;
    } catch (e) {}
};

// Find the cluster to which the coordinates belong
exports.findCluster = function (clusters, coordinates) {
    const labels = [];
    const data = [];
    for (let i = 0; i < clusters.length; i++) {
        clusters[i].forEach((loc) => {
            data.push(loc);
            labels.push(i);
        });
    }
    const knn = new KNN(data, labels);
    const result = knn.predict([coordinates]);
    return result[0];
};

// 26.249750736046146, 78.16466840385506
// 26.249277535883223, 78.16717705139784
// 26.250098761777817, 78.16510750206896
// 26.249851481590614, 78.16526408083935

// 0.00255288677541454738016347776912
