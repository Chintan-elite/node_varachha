const axios = require("axios")


const weatherdata = (lat,lon)=>{

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c6011b7fb7155f7b12560fc19d803e96&units=metric`

    return new Promise((resolve,reject)=>{
        axios.get(url).then(result=>{
            const dt = result.data.main
        
            const city = result.data.name
            const temp = dt.temp
            const pressure = dt.pressure
            const humidity = dt.humidity
        
            resolve({city,temp,pressure,humidity})
            
        
        }).catch(err=>{
           reject(err)
        })
        
    })
}

module.exports={weatherdata}