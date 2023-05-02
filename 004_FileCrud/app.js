const yargs = require("yargs")
const file = require("./file")


yargs.command({
    command : "add",
    builder :{
        book : {
            type : String
        },
        price : {
            type : Number
        },
        qty : {
            type : Number
        }
    },
    handler : function(argv){
        const data = {
            book : argv.book,
            price : argv.price,
            qty : argv.qty
        }
        file.addData(data)
    }
})

yargs.command({
    command:"view",
    handler : function(argv){
        file.viewFile()
    }
})


yargs.command({
    command : "delete",
    builder : {
        book : {
            type : String
        }
    },
    handler : function(argv){
        file.removeData(argv.book)
    }

})


yargs.command({
    command : "byname",
    builder : {
        book : {
            type : String
        }
    },
    handler : function(argv){
        file.dataByName(argv.book)
    }

})



yargs.argv