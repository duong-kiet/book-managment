const express = require("express")
const router = express.Router();

// Upload ảnh 
const multer  = require('multer')

const storageMulterHelper = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storageMulterHelper.storage })

const controller = require("../../controllers/admin/book.controller");

const validate = require("../../validates/admin/book.validate.js")

// admin/books
router.get("/", controller.index);

// admin/books/change-status/:statusChange/:id
router.patch("/change-status/:statusChange/:id", controller.changeStatus);

// PATCH /admin/books/delete/:id
router.patch("/delete/:id", controller.deleteItem);

// GET admin/books/create 
router.get("/create", controller.create);

// POST admin/books/create
router.post("/create", upload.single('thumbnail'), validate.createPost, controller.createPost);

// GET admin/books/edit/:id
router.get("/edit/:id", controller.edit);

// PATCH admin/books/edit/:id
router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost, controller.editPatch);

// GET admin/books/detail/:id
router.get("/detail/:id", controller.detail);

module.exports = router;

