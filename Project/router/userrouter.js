const router = require("express").Router()
const Category = require("../model/categories")
const auth = require("../middleware/auth")
const Product = require("../model/products")
const User  = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.get("/",async (req,resp)=>{
    try {
        const catdata = await Category.find()
        const prodata = await Product.find();
        resp.render("index",{catdata:catdata,prodata:prodata})
    } catch (error) {
     console.log(error);   
    }
    
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

router.get("/details",async(req,resp)=>{
    const pid = req.query.pid
    try {
        const pdata = await Product.findOne({_id:pid})
        resp.render("detail",{pdata:pdata})
    } catch (error) {
        
    }
})


router.post("/do_register",async(req,resp)=>{
    try {
      
        const user = new User(req.body)
        await user.save()
        resp.render("reg",{msg:"registration successfully done !!!"})
    } catch (error) {
        console.log(error);   
    }
})

router.post("/do_login",async(req,resp)=>{
    try {
        const udata = await User.findOne({email:req.body.email})

        const isvalid = await bcrypt.compare(req.body.pass,udata.pass)
        if(isvalid)
        {
            const token  = await jwt.sign({_id:udata._id},process.env.S_KEY)
            resp.cookie("jwt",token)
            resp.redirect("/")
        }
        else
        {
            resp.render("login",{err:"Invalid credentials"})
        }

    } catch (error) {
        resp.render("login",{err:"Invalid credentials"})
    }
})



//***********************cart */
const Cart = require("../model/carts")
router.get("/add_cart",auth,async(req,resp)=>{

     const uid = req.user._id
     const pid = req.query.pid
     try {
        
        const pdata = await Product.findOne({_id:pid})
        const cart = new Cart({uid:uid, pid:pid,price:pdata.price,qty:1,total:pdata.price})
        await cart.save()
        resp.send("Product added into cart !!!")
     } catch (error) {
        console.log(error);
     }

})

router.get("/cart",auth,(req,resp)=>{
    resp.render("cart")
})





module.exports=router