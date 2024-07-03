const multer  = require('multer')

module.exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/'); // thư mục muốn upload ảnh vào
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)  // định dạng file muốn đặt 
    }
})