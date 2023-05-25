const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const app = express()
const PORT = 3000
const url = "mongodb+srv://tops:tops@cluster0.g2xyqwx.mongodb.net/erp?retryWrites=true&w=majority";
mongoose.connect(url).then(()=>{
    console.log("Db connected");
}).catch(err=>{
    console.log(err);
})
app.use(express.json())


app.use("/",require("./router/studentrouter"))



app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})