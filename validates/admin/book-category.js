// PATCH /admin/books-category/edit/:id
module.exports.editPatch = async (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Tiêu đề không được để trống")
        res.redirect("back");
        return;
    }
    next(); // có response rồi thì sẽ end 
}