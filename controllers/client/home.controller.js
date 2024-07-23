const Product = require("../../models/product.model")

// GET 
module.exports.index = async (req, res) => {
    // Sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    })
    .sort({ position: "desc"})
    .limit(6)
    .select("-description");

    for (const item of productsFeatured) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    // Sản phẩm mới nhất
    const productsNew = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({ position: "desc"})
    .limit(6)
    .select("-description");

    for (const item of productsFeatured) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chu",
        productsFeatured: productsFeatured,
        productsNew: productsNew
    });
}