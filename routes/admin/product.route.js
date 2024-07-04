const express = require("express")
const multer  = require('multer')
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate.js")

// const upload = multer({ dest: './public/uploads/' }) // up ảnh vào thư mục này 

const storageMulterHelper = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulterHelper.storage })

// admin/products
router.get("/", controller.index);  

router.patch("/change-status/:statusChange/:id", controller.changeStatus);  // : cho thằng động

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

// router.patch("/trash", controller.trash);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create); 

router.post("/create", upload.single('thumbnail'),validate.createPost, controller.createPost); // truyền ô input mà ta muốn lấy 

module.exports = router;
   