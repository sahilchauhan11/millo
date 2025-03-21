// for chatting
    
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocket ,io} from "../socket/socketIo.js";
import mongoose from "mongoose";


export async function sendMessage(req,res){
    try{
        const senderId=mongoose.Types.ObjectId(req.id);
        const receiverId=mongoose.Types.ObjectId(req.params.id);
        const {message}=req.body;
        console.log(message)
  
        let conversation=await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })
    
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]

            })}
     
            const newMessage=await Message.create({
                senderId:senderId,
                receiverId:receiverId,
                content:message
            })
          if (newMessage){
            conversation.messages.push(newMessage._id);
            await conversation.save();
            await newMessage.save();
        }
        const receiverSocket=getReceiverSocket(receiverId);
        if (receiverSocket){
            console.log("sending message--->",message,"-to-",receiverSocket)
            io.to(receiverSocket).emit('newMessage',newMessage);
        }
        
           return res.status(200).json({message:newMessage,success:true,newMessage});
        
    }   
    catch(error){
       return res.status(500).json({message:error.message,success:false});
    }
}
export async function getMessage(req,res){
    try{
        const senderId=req.id;
        const receiverId=req.params.id;
       
        let conversation=await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })?.populate("messages");
       
        if(!conversation){
            return res.status(200).json({message:"Conversation not found",success:true,message:[]});
        }
        return res.status(200).json({message:"Conversation found",success:true,message:conversation.messages});
    }catch(error){
      return  res.status(500).json({message:"Error getting messages",error:error.message,success:false});
    }
}