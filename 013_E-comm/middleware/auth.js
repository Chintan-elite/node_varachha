const jwt = require("jsonwebtoken")
const User = require("../model/users")
const auth = async(req,resp,next)=>{
    
    const token = req.header("auth-token")
   
    try {
        const data = await jwt.verify(token,process.env.S_KEY)
        if(data)
        {
            const user = await User.findOne({_id:data._id})
            req.user = user;
            next()
        }else
        {
            resp.send("Invalid token")
        }
    } catch (error) {
        resp.send("Invalid token")
    }


}

module.exports=auth