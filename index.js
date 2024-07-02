const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const database = require("./config/database.js");
database.connect();

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");
const systemConfig = require("./config/system.js")

const app = express();
const port = process.env.PORT;

// Flash
app.use(cookieParser('ASDFGHJKL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static("public"));  // biến thư mục public thành thư mục static có thể truy cập bởi người dùng

app.set("views","./views"); // đến thư mục views 
app.set("view engine", "pug");

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin.index(app);
routeClient.index(app); // kieu goi ham index cua routeClient 

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

