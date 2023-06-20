const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const hbs = require("hbs")
const path = require("path")
const mongoose = require("mongoose")
const dburl = process.env.DB_URL
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


mongoose.connect(dburl).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})


const publicPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templetes/views")
const partialPath = path.join(__dirname,"../templetes/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

app.use("/",require("../router/userrouter"))
app.use("/",require("../router/adminrouter"))

app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})