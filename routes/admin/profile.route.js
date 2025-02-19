const express = require("express")
const router = express.Router();

const controller = require("../../controllers/admin/profile.controller")

// Upload ảnh 
const multer  = require('multer')

const storageMulterHelper = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storageMulterHelper.storage })

router.get("/", controller.index);

router.patch("/edit/:id", upload.single('avatar'), controller.editPatch);

module.exports = router;