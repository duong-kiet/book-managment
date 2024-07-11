const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");

// GET /admin/roles
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

// GET /admin/roles/create
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới nhóm quyền",
    });
}

// POST /admin/roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// GET /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id

    const record = await Role.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/roles/edit.pug", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        record: record
    });
}

// PATCH /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id
    const data = req.body

    await Role.updateOne({
        _id: id,
        deleted: false
    }, data);

    req.flash("success", "Cập nhập thành công")
    res.redirect("back")
}

// GET /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Phân quyền",
        records: records
    });
}

// PATCH /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    const roles = req.body;

    for(const role of roles) {
        await Role.updateOne({
            _id: role.id,
            deleted: false
        }, {
            permissions: role.permissions
        })
    }
    res.json({
        code: 200,
        message: "Cập nhập thành công"
    })
}