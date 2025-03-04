const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    tokenUser: String,
    avatar: {
        type: String,
        default: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"
    },
    address1: String,
    address2: String,
    birthday: String,
    cartLength: {
        type: Number,
        default: 0
    },
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