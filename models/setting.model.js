const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  websiteName: String,
  logo: String,
  color: String
}, {
  timestamps: true
});

const Setting = mongoose.model("Setting", settingSchema, "settings");

module.exports = Setting;