const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: String,
  roomChatId: String,
  message: String,
  images: Array,
  last: Boolean,
}, {
  timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;