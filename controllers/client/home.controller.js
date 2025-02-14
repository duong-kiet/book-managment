const Book = require("../../models/book.model");

// GET 
module.exports.index = async (req, res) => {
    const books = await Book.find({
        deleted: false
    })

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        books: books
    });
}