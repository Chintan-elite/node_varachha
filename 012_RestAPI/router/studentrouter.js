const router = require("express").Router()
const Student = require("../model/students")

router.get("/students",async(req,resp)=>{
    try {
        const data = await Student.find()
        resp.send(data)
    } catch (error) {
        resp.send(err)
    }
})

router.post("/students",async(req,resp)=>{
    try {
        const std = new Student(req.body)

        const data = await std.save()
        resp.send(data)
    } catch (error) {
        resp.send(err)
    }
   
})

router.put("/students/:id",async(req,resp)=>{
    
    const _id =  req.params.id
    try {
        const data = await Student.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

router.delete("/students/:id",async(req,resp)=>{
    const _id =  req.params.id
    try {
        const data = await Student.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

router.post("/login",async(req,resp)=>{
    try {
        
        const user = await Student.findOne({email:req.body.email})
        
       const isMatch =   await bcrypt.compare(req.body.pass,user.pass)
      
       if(isMatch)
       {
         resp.send("welcome : "+user.name)
       }
       else
       {
        resp.send("invalid credentials !!")
       }




    } catch (error) {
        resp.send("invalid credentials !!")
    }
})

module.exports=router

