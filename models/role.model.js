const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true 
});


const Role = mongoose.model("Role", roleSchema, "roles"); // ten connection

module.exports = Role;