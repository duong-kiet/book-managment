const Role = require("../../models/role.model")
const Account = require("../../models/account.model")

const md5 = require('md5');

const generateHelper = require("../../helpers/generate.helper")
const systemConfig = require("../../config/system")

// GET /admin/accounts
module.exports.index = async (req, res) => {
    const records = await Account.find({
        deleted: false
    })

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.roleTitle = role.title
    }

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Tài khoản admin",
        records: records
    });
}

// GET /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    }).select("title")

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Taọ tài khoản admin",
        roles: roles
    });
}

// POST /admin/accounts/create
module.exports.createPost = async (req, res) => {
    // req.body ( dữ liệu của thằng form gửi lên )
    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);

    const account = new Account(req.body);
    await account.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}

// GET /admin/accounts/edit
module.exports.edit = async (req, res) => {
    const id = req.params.id
    const account = await Account.findOne({
        _id: id,
        deleted: false
    })

    const roles = await Role.find({
        deleted: false
    }).select("title")

    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "Chỉnh sửa tài khoản admin",
        roles: roles,
        account: account
    });
}

// PATCH /admin/accounts/edit
module.exports.editPatch = async (req, res) => {
   const id = req.params.id

   await Account.updateOne({
        _id: id,
        deleted: false
   }, req.body)

   req.flash("success", "Cập nhập thành công");

   res.redirect("back")
}