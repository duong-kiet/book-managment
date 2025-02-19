const BookCategory = require("../../models/book-category.model")

// GET /admin/books-category
module.exports.index = async (req, res) => {
	const filter = {
		deleted: false
	}

	const pagination = {
		currentPage: 1,
		limitItems: 4 
	}

  if(req.query.page) {
    pagination.currentPage = parseInt(req.query.page)
  }

	pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

	const countBooksCategory = await BookCategory.countDocuments(filter);
  const totalPage = Math.ceil(countBooksCategory / pagination.limitItems);
  pagination.totalPage = totalPage;

	const booksCategory = await BookCategory
  .find(filter)
  .limit(pagination.limitItems)
  .skip(pagination.skip);

	res.render("admin/pages/books-category/index.pug", {
		pageTitle: "Danh mục sản phẩm",
		booksCategory: booksCategory,
		pagination: pagination
	});
}

// POST /admin/books-category/create
module.exports.createPost = async (req, res) => {
//   console.log(req.body);
	if(req.file) {
	  req.body.thumbnail = `/uploads/${req.file.filename}`;
	}
  
	if(req.body.position) {
	  req.body.position = parseInt(req.body.position);
	} else {
	  const countBooksCategory = await BookCategory.countDocuments({});
	  req.body.position = countBooksCategory + 1;
	}
  
	const newBookCategory = new BookCategory(req.body);
	await newBookCategory.save();
  
	req.flash('success', 'Tạo danh mục thành công') 
	res.redirect("back");
}

// PATCH /admin/books-category/edit/:id
module.exports.editPatch = async (req, res) => {
	const id = req.params.id;
  
	if(req.file) {
	  req.body.thumbnail = `/uploads/${req.file.filename}`;
	}
  
	if(req.body.position) {
	  req.body.position = parseInt(req.body.position);
	} else {
	  const countBooksCategory = await BookCategory.countDocuments({});
	  req.body.position = countBooksCategory + 1;
	}
  
	await BookCategory.updateOne({
	  _id: id,
	  deleted: false
	}, req.body);
  
	req.flash("success", "Cập nhập danh mục thành công")
	res.redirect("back");
}

// PATCH /admin/books-category/delete/:id
module.exports.deleteItem = async (req, res) => {
	const id = req.params.id;
  
	await BookCategory.updateOne({
	  _id: id
	}, {
	  deleted: true
	});
	
	req.flash('success', 'Xoá danh mục thành công') 
	
	res.json({
	  code: 200
	});
}