const Book = require("../../models/book.model");

// GET /books//detail/:slug
module.exports.detail = async (req, res) => {
	const slug = req.params.slug;

	const book = await Book.findOne({
		slug: slug,
		deleted: false,
    	status: "active"
	})

	res.render("client/pages/books/detail.pug", {
		pageTitle: "Chi tiết sản phẩm",
    	book: book
	})
}