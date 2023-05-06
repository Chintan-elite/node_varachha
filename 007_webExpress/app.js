const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")

app.get("/",(req,resp)=>{
    //resp.send("this is index page")
    const location = path.join(__dirname,"index.html")
    resp.sendFile(location)
})

app.get("/home",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"home.html"))
})

app.get("*",(req,resp)=>{
    resp.send("404 : page not found")
})


app.listen(PORT,()=>{
    console.log("Server running on port : "+PORT);
})


