const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    uname : {
        type : String
    },
    pass : {
        type : String
    }
})

module.exports=new mongoose.model("Admin",adminSchema)