const Cart = require("../../models/cart.model")
const Book = require("../../models/book.model")
const User = require("../../models/user.model")

// GET /chat
module.exports.index = async (req, res) => {
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  })
}