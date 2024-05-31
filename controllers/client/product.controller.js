// GET
module.exports.index  = (req, res) => {
    res.render("client/pages/products/index.pug")
}

// POST
module.exports.create  = (req, res) => {
    res.render("client/pages/products/create") // duoi .pug 
    // tuong duong /products/create 
}

// PATCH
module.exports.edit  = (req, res) => {
    res.render("client/pages/products/edit")
    // tuong duong /products/edit
}

// GET 
module.exports.detail  = (req, res) => {
    res.render("client/pages/products/detail")
    // tuong duong /products/detail
}