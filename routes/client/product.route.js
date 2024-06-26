const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);  

/* thông thường là router.get("/", (req, res) => {
    res.render() nhưng bay giờ phải tách riêng ra trong file controller
}) */

module.exports = router;

// require giong import 