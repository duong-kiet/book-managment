const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    books: [
        {
            bookId: String,
            quantity: Number
        }
    ],
    userId: String,
}, {
    timestamps: true // Tự động thêm trường createAt và updateAt
});


const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;