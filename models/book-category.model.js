const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const bookCategorySchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    position: Number,
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


const BookCategory = mongoose.model("BookCategory", bookCategorySchema, "books-category"); // ten connection

module.exports = BookCategory;