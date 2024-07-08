const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")

const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper")

const createTreeHelper = require("../../helpers/createTree.helper")

// GET /admin/products/
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const filterStatus = [
        {
            label: "Tất cả",
            value: ""
        },
        {
            label: "Hoạt động",
            value: "active"
        },
        {
            label: "Dừng hoạt động",
            value: "inactive"
        }
    ];

    if(req.query.status) {
        find.status = req.query.status // truy vấn 
    }

    // Tìm kiếm 
    let keyword = "";
    if(req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
        keyword = req.query.keyword;
    }
    // End Tìm kiếm 

    // Phân trang
    const pagination = await paginationHelper(req, find);

    // Hết phân trang 

    // Sắp xếp
    const sort= {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc"
    }
    
    // Hết sắp xếp 
    const products = await Product
    .find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skip)
    .sort(sort);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Quan ly san pham",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        pagination: pagination
    });
}

// PATCH /admin/products/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
    const {id, statusChange} = req.params;

    await Product.updateOne({
        _id: id
    }, {
        status: statusChange
    });

    req.flash('success', 'Cập nhật trạng thái thành công')
    // res.redirect("back")
    res.json({
        code: 200
    });
}

// PATCH /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const {status, ids} = req.body;

    // Tìm tất cả các thằng có trong ids rồi update theo status 
    switch (status) {
        case "active":
        case "inactive":
            await Product.updateMany({
                _id: ids
            }, {
                status: status
            });
            break;
        case "delete":
            await Product.updateMany({
                _id: ids
            }, {
                deleted: true
            });
            break;
        default:
            break;
    }

    res.json({
        code: 200
    });
}

// PATCH /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        deleted: true
    });

    req.flash('success', 'Xoá sản phẩm thành công') 

    res.json({
        code: 200
    });
}

// PATCH /admin/products/change-position/:id
module.exports.changePosition = async (req, res) => {
    const id = req.params.id;
    const position = req.body.position;

    await Product.updateOne({
        _id: id
    }, {
        position: position
    });

    res.json({
        code: 200
    });
}

// GET /admin/products/create
module.exports.create = async (req, res) => {
    const categories = await ProductCategory.find({
        deleted: false,
    })

    const newCategories = createTreeHelper(categories)

    res.render("admin/pages/products/create.pug", {
        pageTitle: "Them moi san pham",
        categories: newCategories
    });
}

// POST /admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log(req.file);

    // if(req.file && req.file.filename) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // } cho phần local

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const countProducts = await Product.countDocuments({}); // đếm ra tất cả bản ghi 
        req.body.position = countProducts + 1;
    }
    
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect(`/${systemConfig.prefixAdmin}/products`)
}

// GET /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id,
            deleted: false
        })

        if(product) {
            const categories = await ProductCategory.find({
                deleted: false,
            })
        
            const newCategories = createTreeHelper(categories)

            res.render("admin/pages/products/edit.pug", {
                pageTitle: "Chinh sua san pham",
                product: product,
                categories: newCategories
            });
        } else {
            res.redirect(`/${systemConfig.prefixAdmin}/products`);
        }
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

// PATCH /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    try{
        const id = req.params.id;
        
        // if(req.file && req.file.filename) {
        //     req.body.thumbnail = `/uploads/${req.file.filename}`;
        // }

        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.price = parseInt(req.body.price);
        req.body.stock = parseInt(req.body.stock);
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countProducts = await Product.countDocuments({}); // đếm ra tất cả bản ghi 
            req.body.position = countProducts + 1;
        }

        await Product.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        req.flash("success", "Cập nhập sản phẩm thành công")
    } catch (error) {
        req.flash("error", "Id sản phẩm không hợp lệ")
    }

    res.redirect("back")
}

// GET /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })

        if(product) {
            res.render("admin/pages/products/detail.pug", {
                pageTitle: "Chi tiet san pham",
                product: product
            });
        } else {
            res.redirect(`/${systemConfig.prefixAdmin}/products`);
        }
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}