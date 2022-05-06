const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // verified: {
    //     type: Boolean,
    //     default: false
    // }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;