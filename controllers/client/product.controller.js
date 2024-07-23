const Product = require("../../models/product.model");

// GET /products
module.exports.index  = async (req, res) => {
    const products = await Product
    .find({
        status: "active",
        deleted: false
    })
    .sort({
        position: "desc"
    });

    for (const item of products) {
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
    
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: products
    });
}

// GET /products/:slug
module.exports.detail  = async (req, res) => {
    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    });

    if(product) {
        res.render("client/pages/products/detail.pug", {
            pageTitle: "Chi tiet san pham",
            product: product
        });
    } else {
        res.redirect("/")
    }
}