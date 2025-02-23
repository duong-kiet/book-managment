const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/order.controller")

router.get("/", controller.index);

router.patch("/:status/:id", controller.changeStatus)

module.exports = router;