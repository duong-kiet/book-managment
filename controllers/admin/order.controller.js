const Order = require("../../models/order.model")
const Book = require("../../models/book.model")

const moment = require("moment")

// GET /admin/orders
module.exports.index = async (req, res) => {
  // const orders = await Order.find({})
  const orders = await Order.aggregate([
    {
      $addFields: {
        sortOrder: {
          $cond: { if: { $eq: ["$status", "pending"] }, then: 0, else: 1 }
        }
      }
    },
    { $sort: { sortOrder: 1, createdAt: -1 } } // "pending" lên trước, còn lại sắp xếp createdAt giảm dần
  ])

  // console.log(orders);

  for(const order of orders) {
    order.totalPrice = 0;
    order.createAtFormat = moment(order.createdAt).format("DD/MM/YYYY HH:mm:ss")

    for(const book of order.books) {
      const bookInfo = await Book.findOne({
        _id: book.bookId
      }).select("title thumbnail price")
      
      book.bookInfo = bookInfo
      book.totalPrice = bookInfo.price * book.quantity
      order.totalPrice += book.totalPrice
    }
  }

  res.render("admin/pages/orders/index.pug", {
    pageTitle: "Trang quản lý đặt hàng",
    orders: orders
  });
}

// PATCH /admin/orders/:status/:id
module.exports.changeStatus = async (req, res) => {
  const {id, status} = req.params

  // console.log(req.params)

  await Order.updateOne({
    _id: id
  }, {
      status: status
  });
  
  req.flash('success', 'Cập nhật trạng thái thành công')

  res.json({
    code: 200
  });
}