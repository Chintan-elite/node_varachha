const router = require("express").Router()
const Category = require("../model/categories")

router.post("/",async(req,resp)=>{
    try {
        console.log(req.body);
        const cat = new Category(req.body)
        const data = await cat.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/",async(req,resp)=>{
    try {
       
        const data = await Category.find()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await Category.findOne({_id:_id})
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await Category.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await Category.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})



module.exports=router