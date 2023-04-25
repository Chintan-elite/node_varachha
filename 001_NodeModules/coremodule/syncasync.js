const fs = require("fs")


// const data =  fs.readFileSync("home.txt","utf-8")
// console.log(data);
// console.log("print after method");

fs.readFile("home.txt","utf-8",(err,data)=>{
    console.log(data);
})
console.log("print after method");