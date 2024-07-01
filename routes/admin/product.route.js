const express = require("express")
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

// admin/products
router.get("/", controller.index);  

router.patch("/change-status/:statusChange/:id", controller.changeStatus);  // : cho thằng động

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

// router.patch("/trash", controller.trash);

module.exports = router;
   