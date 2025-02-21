const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    books: [
        {
            bookId: String,
            price: Number,
            quantity: Number
        }
    ]
}, {
    timestamps: true // Tự động thêm trường createAt và updateAt
});


const Order = mongoose.model("Order", orderSchema, "orders"); // ten connection

module.exports = Order;