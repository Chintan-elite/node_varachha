const router = require("express").Router()
const Admin = require("../model/admins")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/admin_auth") 

router.get("/admin",(req,resp)=>{
    resp.render("adminlogin")
})

router.get("/dashboard",aauth,(req,resp)=>{
    resp.render("dashboard")
})

router.post("/admin_login",async(req,resp)=>{
    
    try {
        const admin =await Admin.findOne({uname:req.body.uname})
      
        if(admin.pass==req.body.pass)
        {
            const token = await jwt.sign({_id:admin._id},process.env.A_KEY)
            resp.cookie("ajwt",token)
            resp.render("dashboard")

        }
        else
        {
            resp.render("adminlogin",{err:"Invalid credenials"})
        }
    } catch (error) {
        console.log(error);
        resp.render("adminlogin",{err:"Invalid credenials"})
    }
})

router.get("/admin_logout",aauth,(req,resp)=>{
    resp.clearCookie("ajwt")
    resp.render("adminlogin")
})



router.get("/products",(req,resp)=>{
    resp.render("products")
})

router.get("/users",(req,resp)=>{
    resp.render("users")
})

router.get("/orders",(req,resp)=>{
    resp.render("orders")
})

//*************category************ */
const Category = require("../model/categories")
router.get("/categories",async(req,resp)=>{
    try {
        const catdata = await Category.find()
        resp.render("category",{catdata:catdata})
    } catch (error) {
        console.log(error);
    }
})

router.post("/add_category",aauth, async(req,resp)=>{
    try {
       const cat = new Category(req.body)
       await cat.save()
       resp.redirect("categories")
    } catch (error) {
        console.log(error);
    }
})





module.exports=router