const mongoose  = require("mongoose")

const CategorySchema = new mongoose.Schema({
    catname : {
        type : String
    }
})

module.exports=new mongoose.model("Category",CategorySchema)