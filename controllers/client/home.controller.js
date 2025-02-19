const Book = require("../../models/book.model");
const BookCategory = require("../../models/book-category.model");

// GET 
module.exports.index = async (req, res) => {
    const filter = {
        deleted: false,
        status: "active"
    }
    // tìm kiếm theo tên sách
    const search = req.query.keyword;

    let keyword = "";
    if(search) {
        const regex = new RegExp(req.query.keyword, "i");
        filter.title = regex;
        keyword = search;
    }

     // phân trang 
    const pagination = {
        currentPage: 1,
        limitItems: 12
    }

    if(req.query.page) {
        pagination.currentPage = parseInt(req.query.page)
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

    const countBooks = await Book.countDocuments(filter)
    const totalPage = Math.ceil(countBooks / pagination.limitItems);
    pagination.totalPage = totalPage

    const books = await Book
    .find(filter)
    .limit(pagination.limitItems)
    .skip(pagination.skip);

    const booksCategory = await BookCategory.find({
        deleted: false
    })

    const booksPriceDesc = await Book
    .find(filter)
    .sort({
        price: 'desc'
    })
    .limit(pagination.limitItems)
    .skip(pagination.skip);

    const booksPriceAsc = await Book
    .find(filter)
    .sort({
        price: 'asc'
    })
    .limit(pagination.limitItems)
    .skip(pagination.skip);

    const booksNewest = await Book
    .find(filter)
    .sort({
        position: 'desc'
    })
    .limit(12)

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        books: books,
        booksPriceAsc: booksPriceAsc,
        booksPriceDesc: booksPriceDesc,
        booksNewest: booksNewest,
        booksCategory: booksCategory,
        pagination: pagination,
        keyword: keyword
    });
}

// GET /:star
module.exports.getRating = async (req, res) => {
    const filter = {
        deleted: false
    }

    // rating
    let star = req.params.star;
    star = parseInt(star)

    filter.rating = { $gte: star };

    // tìm kiếm theo tên sách
    const search = req.query.keyword;

    let keyword = "";
    if(search) {
        const regex = new RegExp(req.query.keyword, "i");
        filter.title = regex;
        keyword = search;
    }

     // phân trang 
    const pagination = {
        currentPage: 1,
        limitItems: 12
    }

    if(req.query.page) {
        pagination.currentPage = parseInt(req.query.page)
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

    const countBooks = await Book.countDocuments(filter)
    const totalPage = Math.ceil(countBooks / pagination.limitItems);
    pagination.totalPage = totalPage

    const books = await Book
    .find(filter)
    .limit(pagination.limitItems);

    const booksCategory = await BookCategory.find({
        deleted: false
    })

    const booksPriceDesc = await Book
    .find(filter)
    .sort({
        price: 'desc'
    })
    .limit(pagination.limitItems);

    const booksPriceAsc = await Book
    .find(filter)
    .sort({
        price: 'asc'
    })
    .limit(pagination.limitItems);

    const booksNewest = await Book
    .find(filter)
    .sort({
        position: 'desc'
    })
    .limit(12);
    // sẽ chỉnh lên 12 khi nhiều bản ghi hơn 

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        books: books,
        booksPriceAsc: booksPriceAsc,
        booksPriceDesc: booksPriceDesc,
        booksNewest: booksNewest,
        booksCategory: booksCategory,
        pagination: pagination,
        keyword: keyword
    });
}