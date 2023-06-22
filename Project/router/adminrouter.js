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
            if(req.body.id=="")
            {
                const cat = new Category(req.body)
                 await cat.save()
                 resp.redirect("categories")
            }
            else
            {
                await Category.findByIdAndUpdate(req.body.id,{catname:req.body.catname})
                resp.redirect("categories")
            }

       
    } catch (error) {
        console.log(error);
    }
})

router.get("/deletecategory",async(req,resp)=>{
    const _id = req.query.cid;
    try {
        await Category.findByIdAndDelete(_id)
        resp.redirect("categories")
    } catch (error) {
        console.log(error);
    }
})

router.get("/editcategory",async(req,resp)=>{
    const _id = req.query.cid;
    try {
       const data =  await Category.findOne({_id:_id})
       const catdata = await Category.find()
        resp.render("category",{edata:data,catdata:catdata})
    } catch (error) {
        console.log(error);
    }
})

//********************************************product */
const Product = require("../model/products")
const multer = require("multer")
const storageEngine = multer.diskStorage({
    destination: "./public/productimg",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storageEngine,
  });

  router.get("/products",async(req,resp)=>{
    try {
        const data = await Product.find()
        const catdata = await Category.find()
        resp.render("products",{pdata:data,catdata:catdata})
    } catch (error) {       
    }
    })

    router.post("/add_product",upload.single("img"),async(req,resp)=>{
        try {
            const prod = new Product({catid:req.body.catid,pname:req.body.pname,price:req.body.price,qty:req.body.qty,img:req.file.filename})
            await prod.save()
            resp.redirect("products")
        } catch (error) {
            console.log(error);
        }
    })
  









module.exports=router