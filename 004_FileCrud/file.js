const fs = require("fs")
const { findSourceMap } = require("module")


const addData = (data)=>{
    
    const alldata =  getData();
     
    const duplicate =  alldata.find(ele=>{
        return ele.book==data.book
    })
   
    if(duplicate)
    {
        console.log("Book already exist !!!");
        return;
    }

    alldata.push(data)
    const mydata = JSON.stringify(alldata)
    fs.writeFile("book.json",mydata,()=>{
        console.log("Data inserted !!!!");

    })
}

const viewFile = ()=>{

    const alldata = getData()
    console.log(alldata);

}




const getData = ()=>{

    try {
        const data =  fs.readFileSync("book.json","utf-8")
        const mydata = JSON.parse(data)
        return mydata;
    } catch (error) {
        return [];
    }
}

const removeData = (name)=>{

    var alldata = getData()

    alldata =  alldata.filter(ele=>{
        return ele.book!=name
    })

    const mydata = JSON.stringify(alldata)
    fs.writeFile("book.json",mydata,()=>{
        console.log("Data deleted !!!!");

    })

}


const dataByName = (name)=>{
    alldata = getData()

    const duplicate =  alldata.find(ele=>{
      return ele.book==name
    })

    if(!duplicate)
    {
        console.log("Book not available");
        return;
    }
    console.log(duplicate);
    
}



module.exports={addData,viewFile,removeData,dataByName}