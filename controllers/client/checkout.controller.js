const Cart = require("../../models/cart.model")
const Book = require("../../models/book.model")
const Order = require("../../models/order.model")
const User = require("../../models/user.model");

// GET /checkout
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id

    const cart = await Cart.findOne({
        userId: userId
    })

    cart.totalPrice = 0
    
    if(cart.books.length > 0) {
        for(const book of cart.books) {
            const bookInfo = await Book.findOne({
                _id: book.bookId
            }).select("title thumbnail slug price")
            
            book.bookInfo = bookInfo
            book.totalPrice = book.price * book.quantity
            cart.totalPrice += book.totalPrice
        }
    }

    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}

// POST /checkout/order
module.exports.orderPost = async (req,res) => {
    const userId = res.locals.user.id
    const userInfo = req.body
   
    const orderData = {
        userInfo: userInfo,
        books: []
    }

    const cart = await Cart.findOne({
        userId: userId
    })

    for (const item of cart.books) {
        const bookInfo = await Book.findOne({
            _id: item.bookId
        })

        orderData.books.push({
            bookId: item.bookId,
            price: bookInfo.price,
            quantity: item.quantity,
        })

        await Book.updateOne({
            _id: item.bookId
        }, {
            $inc: { 
                sold: item.quantity 
            } 
        })
    }
    
    const order = new Order(orderData)
    await order.save()

    await Cart.updateOne({
        userId: userId
    }, {
        books: []
    })

    await User.updateOne(
        { _id: userId }, 
        { $set: { cartLength: 0 } }
    );

    res.redirect(`/checkout/success/${order.id}`)
}

// GET /checkout/success/:orderId
module.exports.success = async (req,res) => {
    const orderId = req.params.orderId

    const order = await Order.findOne({
        _id: orderId
    }) 

    let totalPrice = 0

    for (const item of order.books) {
        const bookInfo = await Book.findOne({
            _id: item.bookId
        })

        item.thumbnail = bookInfo.thumbnail
        item.title = bookInfo.title
        item.slug = bookInfo.slug
        item.totalPrice = item.price * item.quantity
        totalPrice += item.totalPrice
    }

    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
        order: order,
        totalPrice: totalPrice
    })
}