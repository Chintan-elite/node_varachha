const bcrypt = require("bcryptjs")
const passHash =async (pass)=>{

        const hpass = await bcrypt.hash(pass,10)
       const isMatch =  await bcrypt.compare("hello",hpass)
       console.log(isMatch);
}

passHash("Hello")