const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);




const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }

});

let messageHistory = {};

io.on('connection', (socket) => {
  console.log(`User connected : ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data)
  });
  socket.on("send_message", (data) =>{
    socket.to(data.room).emit("receive_message",data )
    console.log(data)
  })
  socket.on("disconnect", () =>{
    console.log(`user disconnect: ${socket.id}` )
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
