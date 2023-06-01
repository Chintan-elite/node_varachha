const router = require("express").Router()
const User = require("../model/users")
router.get("/",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})

router.post("/do_register",async(req,resp)=>{
  try {
    const user = new User({uname : req.body.uname,email:req.body.email,pass : req.body.pass})
    await user.save()
    resp.render("reg",{msg : "Registration successfully done !!!"})
  } catch (error) {
    console.log(error);
  }
})

router.get("/viewuser",async(req,resp)=>{
    try {
        const data = await User.find();
        resp.render("view",{userdata:data})
    } catch (error) {
        console.log(error);
    }
})


module.exports=router