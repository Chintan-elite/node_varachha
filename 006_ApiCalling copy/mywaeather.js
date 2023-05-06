const weather= require("./weather")
const geocode = require("./geocode")

var city = process.argv[2]

geocode.geocodedata(city,(data,err)=>{
    if(err)
    {
        console.log(err);
        return;
    }
   
    weather.weatherdata(data.lat,data.lng,(result,err)=>{
        if(err)
        {
            console.log(err);
            return
        }
        console.log(result);
    })
})