const mongoose = require("mongoose");
const GeoSchema = require("./GeoSchema");

const ComplaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    status: {
        type: String,
        enum: ["Pending", "Alloted", "Completed"],
        default: "Pending",
    }
}, {
    timestamps: true
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;