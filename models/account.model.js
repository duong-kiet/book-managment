const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    password: String,
    token: String,
    avatar: String,
    role_id: String,
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


const Account = mongoose.model("Account", accountSchema, "accounts"); // ten connection

module.exports = Account;