const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/book-category.controller")

// Upload ảnh 
const multer  = require('multer')

const storageMulterHelper = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storageMulterHelper.storage })

// GET admin/books-category
router.get("/", controller.index);

// PATCH admin/books-category/edit/:id
router.patch("/edit/:id", upload.single('thumbnail'), controller.editPatch);

// PATCH admin/books-category/delete/:id
router.patch("/delete/:id", controller.deleteItem);

// POST admin/books-category/create
router.post("/create", upload.single('thumbnail'), controller.createPost);

module.exports = router;