const homeRoute = require("./home.route.js")
const productRoute = require("./product.route.js")
const searchRoute = require("./search.route.js")
const cartRoute = require("./cart.route.js")
const checkoutRoute = require("./checkout.route.js")

const categoryMiddleware = require("../../middlewares/client/category.middleware.js")
const cartMiddleware = require("../../middlewares/client/cart.middleware.js")

module.exports.index = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartMiddleware.cartId)

    app.use("/", homeRoute);
    // app.get("/", homeRoute); neu dung get thi tat ca thang con cua no cung se la get 
    
    app.use("/products", productRoute); // khi dung /products thi se chay vao day 
    // app.get("/products", productRoute);

    app.use("/search", searchRoute)

    app.use("/cart", cartRoute)

    app.use("/checkout", checkoutRoute)
}
 // tuong tuong nhu const index ( cho nao const thay bang module.exports)

 // maybe co the /products/edit , /products/detail ( mot producs co the chua hang tram route )
