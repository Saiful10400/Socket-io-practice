const express=require("express")
const http=require("http")
const app=express()
const{Server}=require("socket.io")
const port=5000

const server=http.createServer(app)

 

let connectedUserData=[]
// socket io

const io=new Server(server,{
    cors:true
})
  
 
io.on("connection",(socket)=>{
    
   socket.on("connection",(data)=>{
    connectedUserData.push({id:socket.id,name:data.name})
    console.log(connectedUserData)
    
   })
  
 

  
 
socket.on("message",(message)=>{
    const {id}=connectedUserData.find((item)=>item.name.toUpperCase()==message.to.toUpperCase())
    socket.to(id).emit("recive-message",message.message)
})
   
   
   socket.on("disconnect",(data)=>{
    const id=socket.id
    connectedUserData=connectedUserData.filter(data=>data.id!==id)
    console.log(connectedUserData)
    
    
   })
})

  


 

// routes.

app.get("/",(req,res)=>{
    res.send("server is running.")
})

server.listen(port,()=>{
    console.log("server is runnig at 5000")
})