const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
var cookieParser = require('cookie-parser')
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
var bodyParser = require('body-parser')
app.use(cookieParser())
mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})
app.use(bodyParser.urlencoded({ extended: false }))
const viewPath = path.join(__dirname,"../templetes/views")
const partialPath = path.join(__dirname,"../templetes/partials")
const publicPath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})
