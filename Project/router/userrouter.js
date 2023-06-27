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
        
        const data = await Cart.findOne({$and : [{pid:pid},{uid:uid}]})
        if(data){
            var qty = data.qty;
            qty++;
            var price = data.price * qty
            await Cart.findByIdAndUpdate(data._id,{qty:qty,total:price});
            resp.send("Product added into cart !!!")
        }
        else
        {
        const pdata = await Product.findOne({_id:pid})
        const cart = new Cart({uid:uid, pid:pid,price:pdata.price,qty:1,total:pdata.price})
        await cart.save()
        resp.send("Product added into cart !!!")
        }
     } catch (error) {
        console.log(error);
     }

})

router.get("/cart",auth,async (req,resp)=>{

    const user = req.user
    try {
        
        const cartdata =await Cart.aggregate([{$match:{uid:user._id}},{$lookup:{from:'products',localField:'pid',foreignField:'_id',as:'product'}}]) 
    
        var sum=0;
        for(var i=0;i<cartdata.length;i++)
        {
            sum = sum + cartdata[i].total
        }


        resp.render("cart",{cartdata:cartdata,total:sum})
    }
    catch (error) {
        console.log(error);
    }
})

router.get("/removefromcart",auth,async(req,resp)=>{
    try{
        const cid = req.query.pid
        await Cart.findByIdAndDelete(cid)
        resp.send()

    }catch(err){
        console.log(err);
    }
})

router.get("/changeqty",auth,async(req,resp)=>{
    try {
            const cid = req.query.cid
            const value = req.query.value

            const cartdata = await Cart.findOne({_id:cid})
            var qty = cartdata.qty+Number(value)
            if(qty!=0)
            { 
            var price = cartdata.price*qty
            await Cart.findByIdAndUpdate(cid,{qty : qty,total:price})
            resp.send()
            }
            else
            {
                resp.send()
            }
    } catch (error) {
        console.log(error);
    }
})

module.exports=router