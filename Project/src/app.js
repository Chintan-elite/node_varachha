const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const hbs = require("hbs")
const path = require("path")
const mongoose = require("mongoose")



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