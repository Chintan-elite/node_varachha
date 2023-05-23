const mongoose = require("mongoose")


dburl = "mongodb://127.0.0.1:27017/shop";

mongoose.connect(dburl).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})

const productSchema = new mongoose.Schema({

        name : {
            type : String
        },
        price : {
            type : Number
        },
        qty : {
            type : Number
        }
})

const Product = new mongoose.model("Product",productSchema)

const addProduct = ()=>{

    const prod = new Product({Name:"Pen",price:50,qty:5})
    prod.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })
}

const addManyProduct = ()=>{

    const p1 = new Product({name:"Speaker",price:5000,qty:10})
    const p2 = new Product({name:"Laptop",price:50000,qty:10})
    const p3 = new Product({name:"Mouse",price:500,qty:11})

    Product.insertMany([p1,p2,p3]).then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })



}

const viewProducts = async ()=>{

    try {
        
       const data = await Product.find()
        console.log(data);

    } catch (error) {
        console.log(error);
    }

}

const updateProduct= async()=>{
    try {
        
      const data =   await Product.findByIdAndUpdate("64660a2ec9f5054b22a4e5fb",{price:55000})
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const deleteProduct = async ()=>{
    try {
        const data = await Product.findByIdAndDelete("64660a2ec9f5054b22a4e5fb")
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const updateManyProduct=()=>{

        Product.updateMany({price:{$gt:500}},{qty:50}).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
}





//addProduct()
//addManyProduct()
//viewProducts()
//updateProduct()
//deleteProduct()
//updateManyProduct()