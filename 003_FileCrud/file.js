const fs = require("fs")

const createFile = (data)=>{

   const alldata = viewData();
  
   const duplicate =  alldata.find(ele=>{
      return ele.name ==data.name
   })

   if(duplicate)
   {
      console.log("Name exist !!!");
      return;
   }


   alldata.push(data)
   const newData = JSON.stringify(alldata)
  
   fs.writeFile("student.json",newData,()=>{
   console.log("File created successfully !!!");
  })

}

const viewFile = ()=>{
   const alldata =  viewData()
   console.log(alldata);
}

const viewData = ()=>{

   const data = fs.readFileSync("student.json","utf-8")
   return JSON.parse(data);
}

const removeData = (name)=>{

      var alldata = viewData();

      var duplicate = alldata.find(ele=>{
         return ele.name==name
      })

      if(!duplicate)
      {
         console.log("data not available");
         return;
      }

      alldata =  alldata.filter(ele=>{
         return ele.name !=name
      })

      const newData = JSON.stringify(alldata)
  
   fs.writeFile("student.json",newData,()=>{
   console.log("data removed successfully !!!");
  })


}


module.exports={createFile,viewFile,removeData}