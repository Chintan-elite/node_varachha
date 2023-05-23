const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 3000
const url = "mongodb://127.0.0.1:27017/restapi";
mongoose.connect(url).then(()=>{
    console.log("Db connected");
}).catch(err=>{
    console.log(err);
})
app.use(express.json())

const studentSchema = new mongoose.Schema({
    name : {
        type :String
    },
    email : {
        type : String
    },
    pass :{
        type : String
    },
    joindata : {
        type : Date,
        default:Date.now()
    }
})

const Student = new mongoose.model("Student",studentSchema)



app.get("/students",async(req,resp)=>{
    try {
        const data = await Student.find()
        resp.send(data)
    } catch (error) {
        resp.send(err)
    }
})

app.post("/students",async(req,resp)=>{
    try {
        const std = new Student(req.body)
        const data = await std.save()
        resp.send(data)
    } catch (error) {
        resp.send(err)
    }
   
})

app.put("/students/:id",async(req,resp)=>{
    
    const _id =  req.params.id
    try {
        const data = await Student.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

app.delete("/students/:id",async(req,resp)=>{
    const _id =  req.params.id
    try {
        const data = await Student.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }

})

app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})