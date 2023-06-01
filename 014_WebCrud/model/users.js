const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userScema = new mongoose.Schema({
    uname : {
        type : String
    },
    email : {
        type : String
    },
    pass : {
        type : String
    },
    img : {
        type:String
    }
})

userScema.pre("save",async function(){
    try {
        this.pass = await bcrypt.hash(this.pass,10)
    } catch (error) {
        console.log(error);
    }
})


module.exports=new mongoose.model("User",userScema)