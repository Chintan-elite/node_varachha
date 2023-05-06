

const add = (a,b)=>{
        return new Promise((resolve,reject)=>{
            return resolve(a+b)
        //   reject("add :error")
        })
}

const square=(a)=>{
    return new Promise((resolve,reject)=>{
       return resolve(a*a)
       //return reject("sq : error")
    })
}



// add(10,20).then(result=>{
//     console.log(result);
//     return square(result)
// }).then(data=>{
//     console.log(data);
// }).catch(err=>{
//     console.log(err);
// })

const mydata =async ()=>{

      const result = await add(10,20)
      console.log(result);
      const data = await square(result)
      console.log(data);
    }

mydata()