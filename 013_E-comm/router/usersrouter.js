const router = require("express").Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.post("/",async(req,resp)=>{
    try {
        console.log(req.body);
        const user = new User(req.body)
        const data = await user.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/",async(req,resp)=>{
    try {
       
        const data = await User.find()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await User.findOne({_id:_id})
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await User.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await User.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.post("/login",async(req,resp)=>{
    try {
        const user = await User.findOne({email:req.body.email})
       
        const isMatch = await bcrypt.compare(req.body.pass,user.pass)

        if(isMatch)
        {
            const token = await jwt.sign({_id:user._id},process.env.S_KEY)
            resp.send("auth-token : "+token)
        }
        else
        {
            resp.send("invalid credentials")
        }
    } catch (error) {
        console.log(error);
        resp.send("invalid credentials")
        
    }
})


module.exports=router