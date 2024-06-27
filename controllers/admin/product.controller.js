const Product = require("../../models/product.model")

// GET /admin/products/
module.exports.index = async (req, res) => {
    const products = await Product.find({});

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Quan ly san pham",
        products: products
    });
}