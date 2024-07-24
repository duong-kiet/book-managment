const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: String,
            quantity: Number
        }
    ]
}, {
    timestamps: true // Tự động thêm trường createAt và updateAt
});


const Cart = mongoose.model("Cart", cartSchema, "carts"); // ten connection

module.exports = Cart;