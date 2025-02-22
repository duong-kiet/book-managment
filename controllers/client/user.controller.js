const md5 = require("md5")
const generateHelper = require("../../helpers/generate.helper")
const sendEmailHelper = require("../../helpers/sendMail.helper");

const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");


// GET /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng ký tài khoản",
        titleHead: "Đăng ký"
    });
}

// POST /user/register
module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    
    if(existUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    }

    const user = new User(userData);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng ký tài khoản thành công!");
    res.redirect("/");
}

// GET /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
      pageTitle: "Đăng nhập tài khoản",
      titleHead: "Đăng nhập"
    });
};
  
// POST /user/login
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });
  
    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }
  
    if(md5(req.body.password) != user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }
  
    if(user.status != "active") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }
  
    res.cookie("tokenUser", user.tokenUser);
  
    req.flash("success", "Đăng nhập thành công!");
    res.redirect("/");
};

// GET /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
};

// GET /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
      pageTitle: "Lấy lại mật khẩu",
      titleHead: "Lấy lại mật khẩu",
    });
  };
  
// POST /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
  
    const user = await User.findOne({
      email: email,
      deleted: false
    });
  
    if(!user) {
      req.flash("error", "Email không tồn tại trong hệ thống!");
      res.redirect("back");
      return;
    }
  
    const otp = generateHelper.generateRandomNumber(6);
  
    // Việc 1: Lưu email, OTP vào database
    const forgotPasswordData = {
      email: email,
      otp: otp,
      expireAt: Date.now() + 3*60*1000
    }; 
  
    const forgotPassword = new ForgotPassword(forgotPasswordData);
    await forgotPassword.save(); 
  
    // Việc 2: Gửi mã OTP qua email của user
    const subject = "Mã OTP lấy lại mật khẩu.";
    const htmlSendMail = `Mã OTP xác thực của bạn là <b style="color: green;">${otp}</b>. Mã OTP có hiệu lực trong 3 phút. Vui lòng không cung cấp mã OTP cho người khác.`;
    sendEmailHelper.sendEmail(email, subject, htmlSendMail);

    res.redirect(`/user/password/otp?email=${email}`);
};

// GET /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
  
    res.render("client/pages/user/otp-password", {
      pageTitle: "Xác thực OTP",
      email: email,
      titleHead: "Xác thực OTP"
    });
};
  
// POST /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if(!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
};
  
// GET /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu mới",
        headTitle: "Đổi mật khẩu mới"
    });
};

// PATCH /user/password/reset
module.exports.resetPasswordPatch = async (req, res) => {
    const password = req.body.password;
    const password2 = req.body.password2;
    const tokenUser = req.cookies.tokenUser;
  
    console.log(password)
    console.log(password2)

    if(password != password2) {
        req.flash("error", "Xác thực lại mật khẩu không dúng");
        res.redirect("back");
        return;
    }

    await User.updateOne({
      tokenUser: tokenUser,
      deleted: false
    }, {
      password: md5(password)
    });
  
    res.redirect("/");
};

// GET /user/profile
module.exports.profile = async (req, res) => {
    res.render("client/pages/user/profile", {
      pageTitle: "Thông tin cá nhân",
    });
};

// PATCH /user/profile
module.exports.profilePatch = async (req, res) => {
    if(req.file) {
        req.body.avatar = `/uploads/${req.file.filename}`;
    }


    const user = res.locals.user

    await User.updateOne({
        _id: user.id,
        deleted: false
    }, req.body);

    req.flash("success", "Cập nhập thông tin thành công")

    res.redirect(`/user/profile`)
    
};