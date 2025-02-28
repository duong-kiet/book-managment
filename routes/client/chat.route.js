const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/chat.controller")

router.get("/", controller.index);

// router.post("/add/:bookId", controller.addPost);

// router.delete("/delete/:bookId", controller.delete)

// router.patch("/update/:bookId/:quantity", controller.updatePatch)

module.exports = router;