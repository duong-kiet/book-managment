const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // truy cập biến môi trường trong file .env
        console.log("Kết nối database thành công");
    } catch (error) {
        console.log("Kết nối database thất bại");
    }
}