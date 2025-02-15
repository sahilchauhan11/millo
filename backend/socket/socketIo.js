import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:process.env.URL,
        methods:["GET","POST"],
    }
});
const users = {};
export const getReceiverSocket=(receiverId)=>{
    return users[receiverId];
}
io.on('connection', (socket) => {
   
    let userId = socket.handshake.query.userId;
   if (userId){
    users[userId] = socket.id;
  console.log("user connneted----->>",users[userId])
   }
   io.emit('getOnlineUsers',Object.keys(users));
  socket.on('disconnect',()=>{
    if(userId ){
        delete users[userId];
        
    }
  });
});

export{io,server,app};
