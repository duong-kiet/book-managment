const Account = require("../../models/account.model")
const Role = require("../../models/role.model");
const User = require("../../models/user.model");

const md5 = require('md5');
const generateHelper = require("../../helpers/generate.helper")

// const systemConfig = require("../../config/system")

// GET /admin/accounts
module.exports.index = async (req, res) => {
    const accounts = await Account.find({
        deleted: false
    })

    const roles = await Role.find({
        deleted: false
    })

    for (const account of accounts) {
        const roleAccount = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })
        account.roleTitle = roleAccount.title
    }

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Tài khoản admin",
        accounts: accounts,
        roles: roles
    });
}

// PATCH /admin/accounts/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
    const {id, statusChange} = req.params;
  
    await Account.updateOne({
      _id: id
    }, {
        status: statusChange
    });
    
    req.flash('success', 'Cập nhật trạng thái thành công')
  
    res.json({
      code: 200
    });
}

// POST /admin/accounts/create
module.exports.createPost = async (req, res) => {
    if(req.file) {
        req.body.avatar = `/uploads/${req.file.filename}`;
    }

    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);

    const account = new Account(req.body);
    await account.save();

    req.flash("success", "Tạo tài khoản quản trị thành công");
    res.redirect("back");
}

// GET /admin/accounts/users
module.exports.getUsers = async (req, res) => {
    const users = await User.find({
        deleted: false
    })

    res.render("admin/pages/accounts/user.pug", {
        pageTitle: "Tài khoản users",
        users: users
    });
}

// PATCH /admin/accounts/users/change-status/:statusChange/:id
module.exports.userChangeStatus = async (req, res) => {
    const {id, statusChange} = req.params;
  
    await User.updateOne({
      _id: id
    }, {
        status: statusChange
    });
    
    req.flash('success', 'Cập nhật trạng thái thành công')
    res.json({
        code: 200
    })
}


// PATCH /admin/accounts/users/delete/:id
module.exports.deleteUser = async (req, res) => {
    const {id} = req.params;
  
    await User.updateOne({
      _id: id
    }, {
      deleted: true
    });
    
    req.flash('success', 'Xoá tài khoản thành công') 
    
    res.json({
      code: 200
    });
  }