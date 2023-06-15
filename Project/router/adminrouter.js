const router = require("express").Router()

router.get("/admin",(req,resp)=>{
    resp.render("adminlogin")
})

module.exports=router