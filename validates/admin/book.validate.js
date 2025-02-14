// POST /admin/books/create
module.exports.createPost = async (req, res, next) => {
    if(!req.body.title) {
        req.flash("error", "Tiêu đề không được để trống")
        res.redirect("back");
        return;
    }
    next(); // có response rồi thì sẽ end 
}