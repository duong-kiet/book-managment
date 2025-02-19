const dashboardRoute = require("./dashboard.route.js")
const booksRoute = require("./book.route.js")
const booksCategoryRoute = require("./book-category.route.js");
const rolesRoute = require("./role.route.js");
const accountsRoute = require("./account.route.js");
const authRoute = require("./auth.route.js")
const profileRoute = require("./profile.route.js")

// const userRoute = require("./user.route.js")

// const orderRoute = require("./order.route.js")

// const systemConfig = require("../../config/system.js")
const authMiddleware = require("../../middlewares/admin/auth.middleware.js")

module.exports.index = (app) => {
    app.use("/admin/dashboard", authMiddleware.requireAuth, dashboardRoute);

    app.use("/admin/books", authMiddleware.requireAuth, booksRoute);

    app.use("/admin/books-category", authMiddleware.requireAuth, booksCategoryRoute);

    app.use("/admin/roles", authMiddleware.requireAuth, rolesRoute);

    app.use("/admin/accounts", authMiddleware.requireAuth, accountsRoute);

    app.use("/admin/auth", authRoute);

    app.use("/admin/profile", authMiddleware.requireAuth, profileRoute);

    app.get("*", (req, res) => {
        res.render("admin/pages/errors/404", {
            pageTitle: "404 Not Found"
        });
    });

    // app.use("/admin/order", orderRoute);
}