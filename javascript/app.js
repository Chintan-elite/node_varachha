
// const data = {
//     name : "aryan",
//     email : "aryan@gmail.com"
// }

// console.log(data);

// const jsondata = JSON.stringify(data)

// console.log(jsondata);

// console.log(data.name);
// console.log(jsondata.name);

// const maindata = JSON.parse(jsondata)
// console.log(maindata);

var a = [10,20,30,10]

const dt =  a.filter(ele=>{
    if(ele==10)
    {
        return ele;
    }
})
console.log(dt);
