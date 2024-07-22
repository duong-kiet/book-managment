const dashboardRoute = require("./dashboard.route.js")
const productsRoute = require("./product.route.js")
const productsCategoryRoute = require("./product-category.route.js")
const rolesRoute = require("./role.route.js")
const accountsRoute = require("./account.route.js")
const authRoute = require("./auth.route.js")
const profileRoute = require("./profile.route.js")

const systemConfig = require("../../config/system.js")

const authMiddleware = require("../../middlewares/admin/auth.middleware.js")


module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;
    
    app.use(
        `${path}/dashboard`, 
        authMiddleware.requireAuth,
        dashboardRoute
    ); 

    app.use(
        `${path}/products`, 
        authMiddleware.requireAuth, 
        productsRoute
    );

    app.use(
        `${path}/products-category`, 
        authMiddleware.requireAuth, 
        productsCategoryRoute
    );

    app.use(
        `${path}/roles`, 
        authMiddleware.requireAuth, 
        rolesRoute
    );

    app.use(
        `${path}/accounts`, 
        authMiddleware.requireAuth, 
        accountsRoute
    );
    
    app.use(
        `${path}/profile`, 
        authMiddleware.requireAuth, 
        profileRoute
    );
   
    app.use(`${path}/auth`, authRoute);
}