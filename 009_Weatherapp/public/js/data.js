

const getData = ()=>{

   const city =  document.getElementById("search").value
   
    fetch(`currentweather?location=${city}`).then(data=>{
        return data.json()
    }).then(result=>{
       
       // console.log(result);
        city1.innerHTML=result.city
        temp.innerHTML=result.temp
        pressure.innerHTML=result.pressure
        humidity.innerHTML=result.humidity
        lat.innerHTML=result.lat
        lng.innerHTML=result.lng


    }).catch(err=>{
        console.log(err);
    })





}