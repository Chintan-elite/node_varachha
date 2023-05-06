const weather= require("./weather")
const geocode = require("./geocode")

var city = process.argv[2]
if(!city)
{
    console.log("Please enter city name : ");
    return;
}

// geocode.geocodedata(city).then(result=>{
//     console.log(result);
//     return weather.weatherdata(result.lat,result.lng)
// }).then(data=>{
//     console.log(data);
// }) .catch(err=>{
//     console.log(err);
// })

const getdata = async()=>{

   try {
    const result = await geocode.geocodedata(city)
    const data = await weather.weatherdata(result.lat,result.lng)
    console.log(result);
    console.log(data);
   } catch (error) {
    console.log(error);
   }
}

getdata()