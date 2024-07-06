const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system");

// GET /admin/products-category
module.exports.index = (req, res) => {
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh muc san pham"
    });
}

// GET /admin/products-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Them moi danh muc san pham"
    });
}

// POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countCategory = await ProductCategory.countDocuments({}); // đếm ra tất cả bản ghi 
        req.body.position = countCategory + 1;
    }
    
    const newCategory = new ProductCategory(req.body);
    await newCategory.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
}