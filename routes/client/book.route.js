const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/book.controller");

router.get("/detail/:slug", controller.detail);  

router.post("/detail/:slug/comment", controller.commentPost);  

module.exports = router;