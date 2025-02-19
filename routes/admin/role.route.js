const express = require("express")
const router = express.Router();

const controller = require("../../controllers/admin/role.controller")

router.get("/", controller.index);

router.post("/create", controller.createPost);

router.patch("/edit/:id", controller.editPatch);

router.patch("/delete/:id", controller.deleteItem);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

module.exports = router;