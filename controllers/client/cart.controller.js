const Cart = require("../../models/cart.model")
const Book = require("../../models/book.model")

// GET /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })

    cart.totalPrice = 0
    
    if(cart.books.length > 0) {
        for(const book of cart.books) {
            const bookInfo = await Book.findOne({
                _id: book.bookId
            }).select("title thumbnail slug price")
            
            book.bookInfo = bookInfo
            book.totalPrice = bookInfo.price * book.quantity
            cart.totalPrice += book.totalPrice
        }
    }

    // console.log(cart)

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}


// POST /cart/add/:bookId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId
    const bookId = req.params.bookId;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id: cartId
    })
    
    // Tìm ra phần tử đầu tiên trong books có mã Id = bookId, không có thì undefined
    const existBookInCart = cart.books.find(
        item => item.bookId == bookId
    );

    if(existBookInCart) {
         await Cart.updateOne({
            _id: cartId,
            'books.bookId' : bookId
         }, {
            $set: {
                'books.$.quantity': quantity + existBookInCart.quantity
            }
         })
    } else {
        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                books: {
                    bookId: bookId,
                    quantity: quantity
                }
            }
        })
    }

    res.json({
        code: 200
    });
}

// DELETE /cart/delete/:bookId
module.exports.delete = async (req,res) => {
    const cartId = req.cookies.cartId;
    const bookId = req.params.bookId;

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {
            books: {
                bookId: bookId,
            }
        }
    })

    res.json({
        code: 200
    })
}

// PATCH /cart/update/:bookId/:quantity
module.exports.updatePatch = async (req, res) => {
    const cartId = req.cookies.cartId;
    const bookId = req.params.bookId;
    const quantity = parseInt(req.params.quantity)

    await Cart.updateOne({
        _id: cartId,
        'books.bookId' : bookId
     }, {
        $set: {
            'books.$.quantity': quantity
        }
     })

    res.json({
        code: 200
    })
}

// // GET /cart/update/:productId/:quantity
// module.exports.update = async (req, res) => {
//     const cartId = req.cookies.cartId;
//     const productId = req.params.productId;
//     const quantity = parseInt(req.params.quantity)

//     await Cart.updateOne({
//         _id: cartId,
//         'products.productId' : productId
//      }, {
//         $set: {
//             'products.$.quantity': quantity
//         }
//      })

//      res.redirect("back")
// }