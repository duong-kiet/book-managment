const dashboardRoute = require("./dashboard.route.js")
const booksRoute = require("./book.route.js")
// const userRoute = require("./user.route.js")

// const orderRoute = require("./order.route.js")

// const systemConfig = require("../../config/system.js")
// const authMiddleware = require("../../middlewares/admin/auth.middleware.js")

module.exports.index = (app) => {
    app.use("/admin/dashboard", dashboardRoute);

    app.use("/admin/books", booksRoute);

    // app.use("/admin/user", userRoute);

    // app.use("/admin/book", bookRoute);

    // app.use("/admin/order", orderRoute);
}