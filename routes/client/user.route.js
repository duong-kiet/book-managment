const express = require("express")
const router = express.Router();

// Upload ảnh 
const multer  = require('multer')

const storageMulterHelper = require("../../helpers/storageMulter.helper");
const upload = multer({ storage: storageMulterHelper.storage })

const controller = require("../../controllers/client/user.controller")

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.patch("/password/reset", controller.resetPasswordPatch);

router.get("/profile", controller.profile);

router.patch("/profile", upload.single('avatar'), controller.profilePatch)

module.exports = router;