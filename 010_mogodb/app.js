const mongo = require("mongodb")
const mongoClient = mongo.MongoClient

const dburl = "mongodb://127.0.0.1:27017";
const database = "tops";

mongoClient.connect(dburl).then(result=>{
    
    const mydb = result.db(database)
    console.log("Db connected !!!");

    // mydb.createCollection("emp").then(result=>{
    //     console.log("collection created...");
    // }).catch(err=>{
    //     console.log(err);
    // })

    // const emp1 = {name:"Jay",email:"jay@gmail.com",dept:"node",sal:10000};
    // mydb.collection("emp").insertOne(emp1).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })


    // const emp1 = {name:"Jatin",email:"jatin@gmail.com",dept:"java",sal:11000};
    // const emp2 = {Name:"Aryan",email:"aryan@gmail.com",dept:"Testing",sal:12000};
    // const emp3 = {Name:"Rutvik",email:"rutvik@gmail.com",dept:"Php",sal:13000};
    // mydb.collection("emp").insertMany([emp1,emp2,emp3]).then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").find().toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").find({name:"Jatin"}).toArray().then(result=>{
    //     console.log(result[0].email);
    // }).catch(err=>{
    //     console.log(err);
    // })

    mydb.collection("emp").find({Name:"Rutvik"},{projection:{Name:1,email:1,
    _id:0}}).toArray().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })

    // mydb.collection("emp").find({sal:{$lt:12000}}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").find({$or:[{sal:{$lt:12000}},{dept:{$eq:"java"}}]}).toArray().then(result=>{
    //     console.log(result);
    // }).catch(err=>{
    //     console.log(err);
    // })

    // mydb.collection("emp").findOne({name:"Jay"}).then(result=>{
    //     console.log(result.email);
    // }).catch(err=>{
    //     console.log(err);
    // })



}).catch(err=>{
    console.log(err);
})
