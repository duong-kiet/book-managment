const homeRoute = require("./home.route.js")
const productRoute = require("./product.route.js")

module.exports.index = (app) => {
    app.use("/", homeRoute);
    // app.get("/", homeRoute); neu dung get thi tat ca thang con cua no cung se la get 
    
    app.use("/products", productRoute); // khi dung /products thi se chay vao day 
    // app.get("/products", productRoute);
}
 // tuong tuong nhu const index ( cho nao const thay bang module.exports)

 // maybe co the /products/edit , /products/detail ( mot producs co the chua hang tram route )
