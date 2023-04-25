

function msg()
{
    console.log("node js is single threaded");
}

data = ()=>
{
    console.log("student data");
}

const add = (a,b,callback)=>{
    callback(a+b);
}

const square=(num,sq)=>{
    sq(num*num)
}

module.exports = {msg,data,add,square}