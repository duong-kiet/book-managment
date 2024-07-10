const dashboardRoute = require("./dashboard.route.js")
const productsRoute = require("./product.route.js")
const productsCategoryRoute = require("./product-category.route.js")
const rolesRoute = require("./role.route.js")
const systemConfig = require("../../config/system.js")


module.exports.index = (app) => {
    const path = `/${systemConfig.prefixAdmin}`;
    
    app.use(`${path}/dashboard`, dashboardRoute); 
    app.use(`${path}/products`, productsRoute);
    app.use(`${path}/products-category`, productsCategoryRoute);
    app.use(`${path}/roles`, rolesRoute);
}