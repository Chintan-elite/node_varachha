const jwt = require("jsonwebtoken")
const User = require("../model/users")
const auth = async(req,resp,next)=>{
    
    const token = req.cookies.jwt
   
    try {
        const data = await jwt.verify(token,process.env.S_KEY)
        if(data)
        {
            const user = await User.findOne({_id:data._id})

            const dt =  user.Tokens.find(ele=>{
                return ele.token=token
            })
            if(dt==undefined)
            {
                resp.render("login",{err:"Please login first!!!"})
            }
            else
            {
           
            req.user = user;
            req.token = token
            next()
            }
        }else
        {
            resp.render("login",{err:"Please login first!!!"})
        }
    } catch (error) {
        resp.render("login",{err:"Please login first !!!"})
    }


}

module.exports=auth