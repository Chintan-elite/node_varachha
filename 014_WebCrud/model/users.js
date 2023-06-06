const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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
    },
    Tokens : [
        {
            token : {
                type : String
            }
        }
    ]
})

userScema.pre("save",async function(){
    try {
        if(this.isModified("pass"))
        {
         this.pass = await bcrypt.hash(this.pass,10)
        }
    } catch (error) {
        console.log(error);
    }
})

userScema.methods.generateToken = async function(){
   
        try {
            const token  = await jwt.sign({_id:this._id},process.env.S_KEY)
            this.Tokens = this.Tokens.concat({token:token})
            this.save()
            return token;
        } catch (error) {
            
        }
}


module.exports=new mongoose.model("User",userScema)