const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
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


const Product = mongoose.model("Product", productSchema, "products"); // ten connection

module.exports = Product;