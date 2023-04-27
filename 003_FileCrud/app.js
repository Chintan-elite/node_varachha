const yargs = require("yargs")
const file = require("./file")
yargs.command({
    command : "add",
    builder : {
        name : {
            type : String
        },
        email : {
            type : String
        }
    },
    handler : function(argv){
        // console.log("Add calling...");
        // console.log(argv.name+" "+argv.email);
        const data = {
            name : argv.name,
            email : argv.email
        }
        file.createFile(data)
    }
})

yargs.command({
    command : "view",
    handler : function(argv)
    {
       file.viewFile()
    }
})

yargs.command({
    command : "remove",
    builder : {
        name : {
            type : String
        }
    },
    handler : function(argv){
        file.removeData(argv.name)
    }
})





yargs.argv