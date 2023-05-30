// const bcrypt = require("bcryptjs")
// const passHash =async (pass)=>{

//         const hpass = await bcrypt.hash(pass,10)
//        const isMatch =  await bcrypt.compare("hello",hpass)
//        console.log(isMatch);
// }

// passHash("Hello")

const jwt = require("jsonwebtoken")
const getToken=async()=>{
    try {
        
      const token =   await jwt.sign({name:"yash"},"thisismyloginauthenticationtoken")
        console.log(token);

        const data = await jwt.verify(token,"thisismyloginauthenticationtoken")
        console.log(data);
    } catch (error) {
        
    }
        
}

getToken()