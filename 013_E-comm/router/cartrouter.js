const router = require("express").Router()
const Cart = require("../model/carts")
const auth = require("../middleware/auth")

router.post("/addtocart",auth,async(req,resp)=>{
    try {
        const user =   req.user
        const cart = new Cart({uid:user._id,pid:req.body.pid})
        const data = await cart.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/viewcart", auth,async(req,resp)=>{
    try {

      const user =   req.user
       
        const data = await Cart.aggregate([{$match:{uid:user._id}},{$lookup:{from:'users',localField:"uid",foreignField:"_id",as:"user"}},{$lookup:{
            from:"products",localField:"pid",foreignField:"_id",as:"product"
        }}])
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})


module.exports=router