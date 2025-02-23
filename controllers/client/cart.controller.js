const Cart = require("../../models/cart.model")
const Book = require("../../models/book.model")
const User = require("../../models/user.model")

// GET /cart
module.exports.index = async (req, res) => {
  if(res.locals.user) {
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
            book.totalPrice = bookInfo.price * book.quantity
            cart.totalPrice += book.totalPrice
        }
    }

    res.render("client/pages/cart/index", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
  } else {
      res.redirect("/user/login");
  }
}


// POST /cart/add/:bookId
module.exports.addPost = async (req, res) => {
  if(res.locals.user) {
    const userId = res.locals.user.id
    const bookId = req.params.bookId;
    const quantity = parseInt(req.body.quantity);


    const cart = await Cart.findOne({
        userId: userId
    })
    
    // Tìm ra phần tử đầu tiên trong books có mã Id = bookId, không có thì undefined
    const existBookInCart = cart.books.find(
        item => item.bookId == bookId
    );

    if(existBookInCart) {
      await Cart.updateOne({
        userId: userId,
        'books.bookId' : bookId
      }, {
        $set: {
          'books.$.quantity': quantity + existBookInCart.quantity
        }
      })

    } else {
      await Cart.updateOne({
        userId: userId
      }, {
        $push: {
          books: {
            bookId: bookId,
            quantity: quantity
          }
        }
      })
    }

    const updateCart = await Cart.findOne({
      userId: userId
    })

    await User.updateOne(
      { _id: userId }, 
      { $set: { cartLength: updateCart.books.length } }
    );


    res.json({
        code: 200 
    });
  } else {
    if (req.accepts("json")) {
      return res.json({ code: 401 });
    }
    res.redirect("/user/login")
  }
}

// DELETE /cart/delete/:bookId
module.exports.delete = async (req,res) => {
    const userId = res.locals.user.id;
    const bookId = req.params.bookId;

    await Cart.updateOne({
        userId: userId
    }, {
        $pull: {
            books: {
                bookId: bookId,
            }
        }
    })

    await User.updateOne(
      { _id: userId }, 
      { $inc: { cartLength: -1 } } 
    );

    res.json({
      code: 200
    })
}

// PATCH /cart/update/:bookId/:quantity
module.exports.updatePatch = async (req, res) => {
    const userId = res.locals.user.id;
    const bookId = req.params.bookId;
    const quantity = parseInt(req.params.quantity)

    await Cart.updateOne({
        userId: userId,
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