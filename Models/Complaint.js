const mongoose = require("mongoose");
const GeoSchema = require("./GeoSchema");

const ComplaintSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: GeoSchema,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
        tag: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Low",
        },
        status: {
            type: String,
            enum: ["Pending", "Alloted", "Completed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
