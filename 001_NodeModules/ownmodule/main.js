const calc = require("./calc")

calc.msg()
calc.data()

calc.add(10,30,(result)=>{
    console.log(result);
})

calc.square(5,(value)=>{
    console.log(value);
})