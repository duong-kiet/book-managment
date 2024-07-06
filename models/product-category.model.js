const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
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


const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category"); // ten connection

module.exports = ProductCategory;