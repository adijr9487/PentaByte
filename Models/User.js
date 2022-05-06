const mongoose = require("mongoose");
const GeoSchema = require("./GeoSchema");

const UserSchema = new mongoose.Schema({
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
    location: {
        type: GeoSchema,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;