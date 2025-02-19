const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    thumbnail: String, // ảnh đại diện của sách
    position: Number,
    category_id: String,
    status: String,
    description: String,
    rating: Number,
    sold: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title", // thích trường nào thì thêm vào , phải là duy nhất 
        unique: true
    }
}, {
    timestamps: true // Tự động thêm trường createAt và updateAt
});


const Book = mongoose.model("Book", bookSchema, "books"); // ten connection

module.exports = Book;