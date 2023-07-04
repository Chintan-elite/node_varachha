const express = require("express")
const app = express()
const http = require("http").createServer(app)
const path = require("path")

const publicPath = path.join(__dirname,"./public")
app.use(express.static(publicPath))
app.get("/",(req,resp)=>{
    resp.sendFile(__dirname+"/index.html")
})

http.listen(9000,()=>{
    console.log("server running on port : "+9000);
})


//****************** */
const io = require("socket.io")(http)

io.on('connection',(socket)=>{
    
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

