// GET /admin/products-category
module.exports.index = (req, res) => {
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh muc san pham"
    });
}