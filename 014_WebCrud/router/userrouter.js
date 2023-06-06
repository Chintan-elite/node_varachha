const router = require("express").Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")
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

router.get("/viewuser",auth,async(req,resp)=>{
    try {
        const data = await User.find();
        resp.render("view",{userdata:data})
    } catch (error) {
        console.log(error);
    }
})

router.get("/deleteuser",async(req,resp)=>{
  try {
    const id = req.query.uid
    await User.findByIdAndDelete(id)
    resp.redirect("viewuser")
  } catch (error) {
    console.log(error); 
  }
})

router.get("/edituser",async(req,resp)=>{
  try {
    const id = req.query.uid
    const data = await User.findOne({_id : id})
    resp.render("update",{data: data})
  } catch (error) {
    console.log(error); 
  }
})

router.post("/do_update",async(req,resp)=>{
  try {
    const id = req.body.id
    await User.findByIdAndUpdate(id,req.body)
    resp.redirect("viewuser")
  } catch (error) {
    console.log(error); 
  }
})

router.post("/do_login",async(req,resp)=>{
  try {

      const user = await User.findOne({email:req.body.email})

     
       if(user.Tokens.length>=2)
       {
      
        resp.render("login",{err:"Max user limit reached"})
        return;
       }
        const isValid = await bcrypt.compare(req.body.pass,user.pass)

        if(isValid)
        {

            const token =  await user.generateToken()
            
            resp.cookie("jwt",token)
            resp.redirect("viewuser")
        }
        else
        {
          resp.render("login",{err:"Invalid credentials !!!"})
        }

  } catch (error) {
    resp.render("login",{err:"Invalid credentials !!!"})
  }
})

router.get("/logout",auth,async(req,resp)=>{

  try {
    
 
    const user = req.user
    const token = req.token

     user.Tokens =  user.Tokens.filter(ele=>{
       return ele.token!=token
      })

      user.save()

      resp.clearCookie("jwt")


      resp.render("login")
    } catch (error) {
    
    }
})

router.get("/logoutall",auth,async(req,resp)=>{

  try {
    
 
    const user = req.user
    const token = req.token

     user.Tokens =  []

      user.save()

      resp.clearCookie("jwt")


      resp.render("login")
    } catch (error) {
    
    }
})

module.exports=router