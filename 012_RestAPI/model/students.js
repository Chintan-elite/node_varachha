const mongoose = require("mongoose")

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

studentSchema.pre("save",async function(){
    
    try {
        this.pass = await bcrypt.hash(this.pass,10)
    } catch (error) {
        console.log(error)
    }
})


module.exports = new mongoose.model("Student",studentSchema)

