const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/store"));

var cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const userroute = require("./routes/userRoute");
app.use(userroute);

const postroute = require("./routes/postRoute");
app.use(postroute);


require("./databases/db");
app.listen("90");
