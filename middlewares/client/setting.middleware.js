const Setting = require("../../models/setting.model");
const Book = require("../../models/book.model")

module.exports.setting = async (req, res, next) => {
  const setting = await Setting.findOne({});
  const booksDefault = await Book.find({
    deleted: false
  })

  res.locals.setting = setting;
  res.locals.booksDefault = booksDefault
  next();
}