const router = require("express").Router()
const Category = require("../model/categories")
const auth = require("../middleware/auth")
const Product = require("../model/products")
const User  = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Razorpay = require("razorpay")
const Order = require("../model/orders")
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

//********************payment******************** */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chintan.tops@gmail.com',
      pass: 'adnyjucmpwuevtsu'
    }
  });
router.get("/payment",(req,resp)=>{

    const amt = req.query.amt;
    var instance = new Razorpay({
        key_id: 'rzp_test_9lwGSV1BK5YOo9',
        key_secret: 'ja0XQ9TbbgMG8ELbIshYLlmN',
      });

      var options = {
        amount:Number(amt)*100 ,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };

      instance.orders.create(options, function(err, order) {
       resp.send(order)
      });



})

router.get("/confirmOrder",auth,async(req,resp)=>{
    try {
        const payid = req.query.pid
        const uid = req.user._id

        const cartProduct = await Cart.find({uid:uid})
        var productlist = [];
        var alltotal = 0;
        var row = "";
        for(var i=0;i<cartProduct.length;i++)
        {

            const prod = await Product.findOne({_id:cartProduct[i].pid})

            var pname = prod.pname
            var price = prod.price
            var qty = cartProduct[i].qty
            var total = Number(price)*Number(qty)

            productlist[i]={
                pname:pname,
                price: price,
                qty:qty,
                total:total
            }
            alltotal = alltotal+total;
            row = row+"<tr><td>"+pname+"</td><td>"+price+"</td><td>"+qty+"</td><td>"+total+"</td></tr>"
        }


        const order = new Order({payid:payid,uid:uid,product:productlist,total:alltotal})
        await order.save()

        var mailOptions = {
            from: 'chintan.tops@gmail.com',
            to: req.user.email,
            subject: 'Order Conformation',
            html: "<table border='1'><tr><th>ProductName</th><th>Price</th><th>qty</th><th>Total</th></tr>"+row+"<tr><td>All total</td><td>"+alltotal+"</td></tr></table>"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                resp.send("Order confirmed !!!")
            }
          });





        



    } catch (error) {
        console.log(error);
    }
})


module.exports=router