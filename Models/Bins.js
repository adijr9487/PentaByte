const mongoose = require("mongoose");
const GeoSchema = require("./GeoSchema");

const BinsSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    location: [
        {
            type: GeoSchema,
            required: true,
        },
    ],
});

const Bins = mongoose.model("Bins", BinsSchema);

module.exports = Bins;
