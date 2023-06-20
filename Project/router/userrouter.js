const router = require("express").Router()
const Category = require("../model/categories")
const auth = require("../middleware/auth")
router.get("/",async (req,resp)=>{
    try {
        const catdata = await Category.find()
        resp.render("index",{catdata:catdata})
    } catch (error) {
     console.log(error);   
    }
    
})

router.get("/cart",auth,(req,resp)=>{
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