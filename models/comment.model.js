const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: String,
  bookSlug: String,
  body: String,
  star: Number,
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;