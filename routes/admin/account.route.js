const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/account.controller")

// Upload ảnh 
const multer  = require('multer')

const storageMulterHelper = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storageMulterHelper.storage })

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.post("/create",  upload.single('avatar'), controller.createPost);

// router.patch("/edit/:id", controller.editPatch);

// router.patch("/delete/:id", controller.deleteItem);

// router.get("/permissions", controller.permissions);

// router.patch("/permissions", controller.permissionsPatch);

module.exports = router;