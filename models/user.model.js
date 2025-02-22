const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    tokenUser: String,
    avatar: String,
    address1: String,
    address2: String,
    birthday: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true 
});


const User = mongoose.model("User", userSchema, "users"); // ten connection

module.exports = User;