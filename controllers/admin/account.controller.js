const Account = require("../../models/account.model")
const Role = require("../../models/role.model");

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

// GET /admin/accounts
// module.exports.index = async (req, res) => {
//     const records = await Account.find({
//         deleted: false
//     })

//     for (const record of records) {
//         const role = await Role.findOne({
//             _id: record.role_id,
//             deleted: false
//         })
//         record.roleTitle = role.title
//     }

//     res.render("admin/pages/accounts/index.pug", {
//         pageTitle: "Tài khoản admin",
//         records: records
//     });
// }

// // GET /admin/accounts/create
// module.exports.create = async (req, res) => {
//     const roles = await Role.find({
//         deleted: false
//     }).select("title")

//     res.render("admin/pages/accounts/create.pug", {
//         pageTitle: "Taọ tài khoản admin",
//         roles: roles
//     });
// }

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

// // GET /admin/accounts/edit
// module.exports.edit = async (req, res) => {
//     const id = req.params.id
//     const account = await Account.findOne({
//         _id: id,
//         deleted: false
//     })

//     const roles = await Role.find({
//         deleted: false
//     }).select("title")

//     res.render("admin/pages/accounts/edit.pug", {
//         pageTitle: "Chỉnh sửa tài khoản admin",
//         roles: roles,
//         account: account
//     });
// }

// // PATCH /admin/accounts/edit
// module.exports.editPatch = async (req, res) => {
//    const id = req.params.id

//    await Account.updateOne({
//         _id: id,
//         deleted: false
//    }, req.body)

//    req.flash("success", "Cập nhập thành công");

//    res.redirect("back")
// }