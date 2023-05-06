const axios = require("axios")

const geocodedata = (city)=>{

const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=faed4d9eb29d483a866000c901ccb680`

    return new Promise((resolve,reject)=>{
        axios.get(url).then(result=>{
            const lat = result.data.results[0].geometry.lat;
            const lng = result.data.results[0].geometry.lng;
        
        
            resolve({lat,lng})
        
           
        
        }).catch(err=>{
            reject(err)
        })
        
    })
}

module.exports = {geocodedata}