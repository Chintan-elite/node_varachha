

function square(num,callback)
{
   callback(num*num,num*num*num)
}

// square(5,(sq,cb)=>{
//     console.log(sq+" "+cb);
// })

function add(a,b,callback)
{
    callback(a+b)
}

add(10,20,(result)=>{
    console.log(result);
    square(result,(sq,cb)=>{
        console.log(sq+" "+cb);
    })
})