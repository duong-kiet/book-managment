const Product = require("../../models/product.model")

// GET /admin/products/
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    if(req.query.status) {
        find.status = req.query.status // truy vấn 
    }

    const products = await Product.find(find);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Quan ly san pham",
        products: products
    });
}