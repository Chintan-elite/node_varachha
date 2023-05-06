
const add = (a,b,callback)=>{
    callback(a+b)
}
const square = (a,callback)=>{
    callback(a*a)
}


add(10,20,(result)=>{
    console.log(result);
    square(result,(data)=>{
        console.log(data);
    })
})