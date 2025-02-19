const Role = require("../../models/role.model")
const systemConfig = require("../../config/system");

// GET /admin/roles
module.exports.index = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        roles: roles
    });
}


// POST /admin/roles/create
module.exports.createPost = async (req, res) => {
    const role = new Role(req.body);
    await role.save();

    req.flash("success", "Tạo role thành công")
    res.redirect("back")
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

// PATCH /admin/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
    const {id} = req.params;
  
    await Role.updateOne({
      _id: id
    }, {
      deleted: true
    });
    
    req.flash('success', 'Xoá role thành công') 
    
    res.json({
      code: 200
    });
}

// GET /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Phân quyền",
        roles: roles
    });
}

// PATCH /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    // console.log(req.body);
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