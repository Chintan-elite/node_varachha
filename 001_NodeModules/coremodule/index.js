const fs = require("fs")

// fs.writeFileSync("test.txt","this is test file")

//fs.mkdirSync("Test")

//fs.appendFileSync("test.txt","new data added")

//fs.unlinkSync("test.txt")

// var data =  fs.readFileSync("test.txt","utf-8")
// console.log(data);

//async 

// fs.writeFile("home.txt","sun rises in east",(err)=>{
//     console.log("File written successfully..");
// })

fs.readFile("home.txt","utf-8",(err,data)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(data);
})




