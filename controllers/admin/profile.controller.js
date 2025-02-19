const Account = require("../../models/account.model")

const md5 = require('md5');

// GET /admin/dashboard
module.exports.index = (req, res) => {
    res.render("admin/pages/profile/index.pug", {
        pageTitle: "Thông tin cá nhân"
    });
}

// PATCH /admin/profile/edit/:id
module.exports.editPatch = async (req, res) => {
	const id = req.params.id;
	if(req.file) {
	  req.body.avatar = `/uploads/${req.file.filename}`;
	}

    if(req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        req.body.password = res.locals.account.password;
    }
  
	await Account.updateOne({
	  _id: id,
	  deleted: false
	}, req.body);
  
	req.flash("success", "Cập nhật profile thành công")
	res.redirect("back");
}