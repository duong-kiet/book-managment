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

router.get("/users", controller.getUsers);

router.patch("/users/change-status/:statusChange/:id", controller.userChangeStatus);

router.patch("/users/delete/:id", controller.deleteUser);

// router.get("/permissions", controller.permissions);

// router.patch("/permissions", controller.permissionsPatch);

module.exports = router;