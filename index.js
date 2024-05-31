const express = require("express");

const routeClient = require("./routes/client/index.route.js")

const app = express();
const port = 3000;

app.set("views","./views"); // đến thư mục views 
app.set("view engine", "pug");

routeClient.index(app); // kieu goi ham index cua routeClient 

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

