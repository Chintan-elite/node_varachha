const router = require("express").Router()
const mongoose = require("mongoose")
const Category = require("../model/categories")
const Product = require("../model/products")

router.post("/",async(req,resp)=>{
    try {
      
        const prod = new Product(req.body)
        const data = await prod.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/",async(req,resp)=>{
    try {
       
        const data = await Product.aggregate([{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"catgory"}}])


        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/:id",async(req,resp)=>{
    try {
       const _id = new mongoose.Types.ObjectId(req.params.id)
      
        const data =  await Product.aggregate([{$match:
        {_id:_id}},{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"catgory"}}])

        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.put("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await Product.findByIdAndUpdate(_id,req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.delete("/:id",async(req,resp)=>{
    try {
       const _id = req.params.id
        const data = await Product.findByIdAndDelete(_id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

router.get("/category/:id",async(req,resp)=>{
    try {
       const _id = new mongoose.Types.ObjectId(req.params.id)
      
        const data =  await Product.aggregate([{$match:
        {catid:_id}},{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"catgory"}}])

        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})



module.exports=router