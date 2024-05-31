const express = require("express")
const router = express.Router();

router.get("/", (req, res) => {
    res.render("client/pages/products/index.pug")
});

router.post("/create", (req, res) => {
    res.render("client/pages/products/create") // duoi .pug 
    // tuong duong /products/create 
});

router.patch("/edit", (req, res) => {
    res.render("client/pages/products/edit")
    // tuong duong /products/edit
});

router.get("/detail", (req, res) => {
    res.render("client/pages/products/detail")
    // tuong duong /products/detail
});

module.exports = router;