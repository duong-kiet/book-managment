const Book = require("../../models/book.model");
const BookCategory = require("../../models/book-category.model");

// GET /admin/books/
module.exports.index = async (req, res) => {
  const filter = {
      deleted: false
  }

  // sắp xếp theo tên sách 
  let sort = {}

  const sortTitle = req.query.sortTitle;
  if(sortTitle) {
    sort.title = sortTitle;
  }

  // sắp xếp theo tên tác giả 
  const sortAuthor = req.query.sortAuthor;
  if(sortAuthor) {
    sort.author = sortAuthor;
  }

  // lọc theo trạng thái 
  const status = req.query.status;

  if(status) {
    filter.status = status
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
    limitItems: 4 
  }

  if(req.query.page) {
    pagination.currentPage = parseInt(req.query.page)
  }

  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  const countBooks = await Book.countDocuments(filter)
  const totalPage = Math.ceil(countBooks / pagination.limitItems);
  pagination.totalPage = totalPage

  // console.log(pagination);

  const books = await Book
  .find(filter)
  .limit(pagination.limitItems)
  .skip(pagination.skip)
  .sort(sort);

  res.render("admin/pages/books/index.pug", {
    pageTitle: "Trang quản lý sách",
    books: books,
    keyword: keyword,
    pagination: pagination
  });
}

// PATCH /admin/books/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  const {id, statusChange} = req.params;

  await Book.updateOne({
    _id: id
  }, {
      status: statusChange
  });
  // res.redirect("back")
  
  req.flash('success', 'Cập nhật trạng thái thành công')

  res.json({
    code: 200
  });
}

// PATCH /admin/books/delete/:id
module.exports.deleteItem = async (req, res) => {
  const {id} = req.params;

  await Book.updateOne({
    _id: id
  }, {
    deleted: true
  });
  // res.redirect("back")
  
  req.flash('success', 'Xoá sản phẩm thành công') 
  
  res.json({
    code: 200
  });
}

// GET /admin/books/create
module.exports.create = async (req, res) => {
  const categories = await BookCategory.find({
    deleted: false,
  });

  // console.log(categories);

  res.render("admin/pages/books/create.pug", {
    pageTitle: "Trang tạo mới sách",
    categories: categories
  })
}

// POST /admin/books/create
module.exports.createPost = async (req, res) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  
  // console.log(req.body);
  req.body.price = parseInt(req.body.price);

  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countBooks = await Book.countDocuments({});
    req.body.position = countBooks + 1;
  }

  const newBook = new Book(req.body);
  await newBook.save();

  req.flash('success', 'Tạo sản phẩm thành công') 
  res.redirect(`/admin/books`);
}

// GET /admin/books/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const categories = await BookCategory.find({
    deleted: false,
  });

  const book = await Book.findOne({
    _id: id
  })

  res.render("admin/pages/books/edit.pug", {
    pageTitle: "Trang chỉnh sửa sách",
    book: book,
    categories: categories
  })
}

// PATCH /admin/books/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  
  // console.log(req.body);
  req.body.price = parseInt(req.body.price);

  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countBooks = await Book.countDocuments({});
    req.body.position = countBooks + 1;
  }

  await Book.updateOne({
    _id: id,
    deleted: false
  }, req.body);

  req.flash("success", "Cập nhập sản phẩm thành công")

  res.redirect(`/admin/books`)
}

// GET /admin/books/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const book = await Book.findOne({
    _id: id,
    deleted: false
  })

  let category = "";
  if (book.category_id) {
    category = await BookCategory.findOne({
      _id: book.category_id,
      deleted: false
    })
  }

  res.render("admin/pages/books/detail.pug", {
    pageTitle: "Trang chi tiết sách",
    book: book,
    category: category
  })
}