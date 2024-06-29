const Product = require("../../models/product.model")

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
    const pagination = {
        currentPage: 1,
        limitItems: 4,
    }

    if(req.query.page) {
        pagination.currentPage = parseInt(req.query.page);
    }

    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts/pagination.limitItems);
    console.log(totalPage);
    pagination.totalPage = totalPage;


    // Hết phân trang 

    const products = await Product.find(find).limit(pagination.limitItems).skip(pagination.skip);

    console.log(pagination);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Quan ly san pham",
        products: products,
        keyword: keyword,
        filterStatus: filterStatus,
        paginaton: pagination
    });
}