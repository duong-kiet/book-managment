// GET /admin/accounts
module.exports.index = (req, res) => {
    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Tài khoản admin"
    });
}