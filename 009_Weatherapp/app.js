const express = require("express")
const app =express()
const PORT = 9000
const path = require("path")
const hbs = require("hbs")
const weather = require("./util/weather")
const geocode = require("./util/geocode")


const viewPath= path.join(__dirname,"./templetes/views")

const partialPath = path.join(__dirname,"./templetes/partials")

const publicpath = path.join(__dirname,"./public")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicpath))
app.get("/",(req,resp)=>{
    resp.render("index")
})

app.get("/weather",(req,resp)=>{
    resp.render("weather")
})

app.get("/currentweather",(req,resp)=>{

   const location =  req.query.location;

    geocode.geocodedata(location,(data,err)=>{
        weather.weatherdata(data.lat,data.lng,(result,err)=>{
           
            resp.send({
                city : result.city,
                lat : data.lat,
                lng : data.lng,
                temp : result.temp,
                pressure : result.pressure,
                humidity : result.humidity
            })

        })
    })



})



app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})