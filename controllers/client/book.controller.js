const Book = require("../../models/book.model");
const Comment = require("../../models/comment.model")
const User = require("../../models/user.model")

const moment = require("moment")

// GET /books//detail/:slug
module.exports.detail = async (req, res) => {
	const slug = req.params.slug;

	const book = await Book.findOne({
		slug: slug,
		deleted: false,
    	status: "active"
	})

	const comments = await Comment
	.find({
		bookSlug: slug
	})
	.sort({ 
		createdAt: -1 
	})

	for(const comment of comments) {
		const userInfo = await User.findOne({
			_id: comment.userId
		}).select("id avatar fullName")
		comment.userInfo = userInfo
		comment.createdAtFormat = moment(comment.createdAt).format("DD/MM/YYYY HH:mm:ss")
	}

	res.render("client/pages/books/detail.pug", {
		pageTitle: "Chi tiết sản phẩm",
    	book: book,
		comments: comments
	})
}

// POST /books/detail/:slug/comment
module.exports.commentPost = async (req, res) => {
	const slug = req.params.slug;
	const userId = res.locals.user.id

	const commentData = {
		userId: userId,
		bookSlug: slug,
		body: req.body.body,
		star: req.body.star
	}; 

	const comment = new Comment(commentData)
	await comment.save(); 
	
	res.status(201).json({
		code: 201,
		message: "Tạo comment thành công"
	})
}