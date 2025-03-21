import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoDbConnection from './utils/mongoDbConnection.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import messageRoutes from './routes/message.routes.js'; 
import { io,server,app } from './socket/socketIo.js';
import path from 'path';

dotenv.config();
const port = process.env.PORT || 3000;
const _dirname=path.resolve();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
    origin:  process.env.URL,
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/message',messageRoutes);
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
server.listen(port, () => {
  mongoDbConnection();
  console.log(`Server  listen at port->${port}`);
});








