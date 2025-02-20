const Book = require("../../models/book.model");
const BookCategory = require("../../models/book-category.model");

// GET 
module.exports.index = async (req, res) => {
    const filter = {
        deleted: false,
        status: "active",
    }

    // lọc theo nhiều trạng thái 
    let categories = req.query.categories;
    let lowPrice = req.query.lowPrice;
    let highPrice = req.query.highPrice;
    let rating = req.query.rating;

    let booksCategoryId = []
    if(categories) {
        booksCategoryId = await BookCategory
        .find({
            title: categories 
        })
        .select("_id")
        
        booksCategoryId = booksCategoryId.map(doc => doc._id);
        filter.category_id = { $in: booksCategoryId };
    }

    if(lowPrice || highPrice) {
        if(lowPrice) {
            lowPrice = parseInt(lowPrice);
        }
        if(highPrice) {
            highPrice = parseInt(highPrice);
        }

        filter.price = { 
            $gte: lowPrice ? lowPrice : 0, 
            $lte: highPrice ? highPrice : 1000000 
        }
    }

    if(rating) {
        rating = parseInt(rating);
        filter.rating = { $gte: rating };
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
    .find({
        deleted: false,
        status: "active"    
    })
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
        keyword: keyword,

        categories: categories || [],
        lowPrice: lowPrice,
        highPrice: highPrice,
        rating: rating || 1
    });
}
