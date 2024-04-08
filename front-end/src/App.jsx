import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const App = () => {
  const formsubmitHandle = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

   
    socket.emit("connection", { name });
  };

  const [message,setMEssage]=useState()

  const messageSentHandle=(e)=>{
    e.preventDefault()
    const message=e.target.message.value
    const to=e.target.to.value
    socket.emit("message",{to,message})

  }

  useEffect(()=>{
socket.on("recive-message",(data)=>{
  setMEssage(data)
})
  },[])

  return (
    <div>
      <h1>Home route</h1>

      <form onSubmit={formsubmitHandle}>
        <input name="name" type="Your name" />
       
        <button>Connect</button>
      </form>

      <hr />
      <h4>Sent a message</h4>
      <form onSubmit={messageSentHandle}>
        <input name="message" type="Your name"  placeholder="message"/>
        <input name="to" type="Your name" placeholder="to" />
        <button>sent</button>
      </form>
      <hr />

<h1>{message}</h1>

    </div>
  );
};

export default App;
