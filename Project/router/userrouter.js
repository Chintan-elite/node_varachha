const router = require("express").Router()

router.get("/",(req,resp)=>{
    resp.render("index")
})

router.get("/cart",(req,resp)=>{
    resp.render("cart")
})

router.get("/contact",(req,resp)=>{
    resp.render("contact")
})

router.get("/shop",(req,resp)=>{
    resp.render("shop")
})

router.get("/login",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})





module.exports=router