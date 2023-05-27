const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    catname : {
        type : String
    }
})

module.exports=new mongoose.model("Category",categorySchema)