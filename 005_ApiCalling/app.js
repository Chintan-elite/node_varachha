const axios = require("axios")

axios.get("https://restcountries.com/v3.1/all").then(result=>{
    
    for(var i=0;i<result.data.length;i++)
    {
        var dt = result.data[i].name.common
        var ct = result.data[i].capital
        console.log(dt+" "+ct);
    }

}).catch(err=>{
    console.log(err);
})