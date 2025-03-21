import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:process.env.URL,
        methods:["GET","POST"],
        credentials: true
    }
});
const users = {};
export const getReceiverSocket=(receiverId)=>{
    return users[receiverId];
}
io.on('connection', (socket) => {
    try {
        const userId = socket.handshake.query.userId;
        
        if (!userId) {
            console.log("Connection attempt without userId");
            return;
        }

        users[userId] = socket.id;
        console.log("User connected:", { userId, socketId: users[userId] });
        
        io.emit('getOnlineUsers', Object.keys(users));
        
        socket.on('disconnect', () => {
            if(userId) {
                console.log("User disconnected:", userId);
                delete users[userId];
                io.emit('getOnlineUsers', Object.keys(users)); 
            }
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

    } catch (error) {
        console.error('Socket connection error:', error);
    }
});

export{io,server,app};
