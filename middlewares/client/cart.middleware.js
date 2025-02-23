const Cart = require("../../models/cart.model")

module.exports.userAuth = async (req, res, next) => {
    if (res.locals.user) {
        const cart = await Cart.findOne({
            userId: res.locals.user.id
        })
        if(!cart) {
            const cart = new Cart({
                userId: res.locals.user.id,
                books: []
            })
            await cart.save();
        }
    } 
    next();
};
