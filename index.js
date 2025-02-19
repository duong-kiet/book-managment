const express = require('express')
require('dotenv').config();

const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');


const database = require("./config/database");
database.connect();

const app = express()
const port = process.env.PORT;

app.use(methodOverride('_method'))

// Flash
app.use(cookieParser('ASDFGHJKL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

// Dùng khi gửi form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Dùng khi gửi form 

app.set("views",`${__dirname}/views`); // đến thư mục views 
app.set("view engine", "pug");
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(express.static(`${__dirname}/public`)); 

const routeAdmin = require("./routes/admin/index.route.js");
const routeClient = require("./routes/client/index.route.js");

routeAdmin.index(app);
routeClient.index(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})