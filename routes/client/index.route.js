const homeRoute = require("./home.route.js")
const bookRoute = require("./book.route.js")
const cartRoute = require("./cart.route.js")
const checkoutRoute = require("./checkout.route.js")
const userRoute = require("./user.route.js")

const cartMiddleware = require("../../middlewares/client/cart.middleware.js")
const userMiddleware = require("../../middlewares/client/user.middleware");
// const settingMiddleware = require("../../middlewares/client/setting.middleware");

module.exports.index = (app) => {
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    
    // app.use(settingMiddleware.setting);

    app.use("/", homeRoute);

    app.use("/books", bookRoute);

    app.use("/cart", cartRoute)

    app.use("/checkout", checkoutRoute)

    app.use("/user", userRoute)

    // app.get("*", (req, res) => {
    //     res.render("client/pages/errors/404", {
    //         pageTitle: "404 Not Found"
    //     });
    // });
}
