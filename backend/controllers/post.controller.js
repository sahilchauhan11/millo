import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import sharp from "sharp";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { getReceiverSocket ,io} from "../socket/socketIo.js";
import path from "path";
import cloudinary from "../utils/cloudinary.js";
import getDataUri  from "../utils/datauri.js";


export async function createPost(req,res){
    try{
        const {caption}=req.body;
        const file=req.file;
       
        const  extname=path.extname(file.originalname);
        if(!file) return res.status(400).json({message:"No file uploaded"})
            const optimisedBuffer=await sharp(file.buffer).resize(1000,1000,{fit:"inside",withoutEnlargement:true}).toFormat("jpeg",{quality:80}).toBuffer();
       
        const fileUri=getDataUri(optimisedBuffer,extname);
       
        const myCloud=await cloudinary.uploader.upload(fileUri);
        const post=await Post.create({
            caption,
            image:myCloud.secure_url,
            owner:req.id
        })
       
        const user=await User.findById(req.id);
        user.posts.push(post._id);
        await user.save();
       
        
       return  res.status(200).json({success:true,message:"post created successfully",post});
    }catch(error){
       return  res.status(500).json({message:error.message,success:false});
    }
}
export const getAllPost = async (req, res) => {
    try {
        const postss = await Post.find()?.sort({ createdAt: -1 })
            ?.populate({ path: 'owner', select: 'username profilePicture' })
            ?.populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'owner',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            post:postss,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({message:"Error fetching posts",error:error.message,success:false});
    }
};
export async function getSelfPost(req,res){
    try{
        const post=await Post.findById(req.id).sort({createdAt:-1}).populate({path:"owner",select:"username , profilePicture"}).populate({path:"comments",
            sort:{createdAt:-1},
            populate:{
                path:"owner",
                select:"username , profilePicture"
            }
        })
    }catch(error){
        res.status(500).json({message:"Error fetching posts",error:error.message,success:false});
    }
}
export async function likePost(req,res){
    try{
        const likeKarneWalaUser=mongoose.Types.ObjectId(req.id);
        const postId=mongoose.Types.ObjectId(req.params.id);
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found",success:false});
        }
        const senderUser=await User.findById(likeKarneWalaUser).select("username profilePicture");
        const postOwnerId=post.owner.toString();
        if(postOwnerId!==likeKarneWalaUser){
            const notification={
                message:`${senderUser.username} liked your post`,
                type:"like",
                postId:postId,
                userId:senderUser._id
            }
            const receiverSocket=getReceiverSocket(postOwnerId);
            if(receiverSocket){
                io.to(receiverSocket).emit('newNotification',notification);
            }
        }
       await post.updateOne({$addToSet:{likes:likeKarneWalaUser}});
       await post.save();
       return res.status(200).json({message:"Post liked successfully",success:true});
    }catch(error){
       return res.status(500).json({message:"Error liking post",error:error.message,success:false});
    }
}
export async function unlikePost(req,res){
    try{
        const unlikeKarneWalaUser=req.id;
        const postId=req.params.id;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found",success:false});
        }
       await post.updateOne({$pull:{likes:unlikeKarneWalaUser}});
       await post.save();
       const senderUser=await User.findById(unlikeKarneWalaUser).select("username profilePicture");
       const postOwnerId=post.owner.toString();
        if(postOwnerId!==unlikeKarneWalaUser){
            const notification={
                message:`${senderUser.username} disliked your post`,
                type:"dislike",
                postId:postId,
                userId:senderUser._id
            }
            const receiverSocket=getReceiverSocket(postOwnerId);
            if(receiverSocket){
                io.to(receiverSocket).emit('newNotification',notification);
            }
        }
       return res.status(200).json({message:"Post unliked successfully",success:true});
    }catch(error){
       return res.status(500).json({message:"Error unliking post",error:error.message,success:false});
    }
}
export async function addComment(req,res){
    try{
       
        const postId=req.params.id;
       
        const userId=req.id;
      
    const commenttext=req.body.comment;
   
        const post=await Post.findById(postId);
      
        if(!post){
            return res.status(404).json({message:"Post not found",success:false});
        }
        if(!commenttext){
            return res.status(404).json({message:"no text  found",success:false});
        }
        const comment=await Comment.create({
            owner:userId,
            content:commenttext,
            postId:postId
        })
        await comment.populate({
            path:"owner",
            select:"username  profilePicture"
    })
         post.comments.push(comment._id);
        await post.save();
       return res.status(200).json({message:"comment added successfully",comment,success:true});
    }
    catch(error){
       return res.status(500).json({message:error.message,success:false});
    }
}       
export async function postComment(req,res){ 
    try{
        const postId=req.params.id;
        const comments=await Comment.find({post:postId})
        .populate({
            path:"owner",
            select:"username  profilePicture"
        })
        if(!comments){
            return res.status(404).json({message:"No comments found",success:false});
        }
       return res.status(200).json({comments,success:true});
    }
    catch(error){
       return res.status(500).json({message:"Error deleting comment",error:error.message,success:false});
    }
}       
export async function deletePost(req,res){
    try{
        const postId=req.params.id;
        const userId=req.id;
        const post=await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not found",success:false});
        }
        if(post.owner.toString()!==userId){
            return res.status(403).json({message:"You are not allowed to delete this post",success:false});
        }
       
        await Post.findByIdAndDelete(postId);
        const user=await User.findById(userId);
        await user.updateOne({$pull:{posts:postId}});
        await Comment.deleteMany({post:postId});
       return res.status(200).json({message:"Post deleted successfully",success:true});
    }
    catch(error){
       return res.status(500).json({message:"Error deleting post",error:error.message,success:false});
    }
}   
export async function bookmarkPost(req,res){
    try{
        const postId=req.params.id;
        const userId=req.id;
        const post=await Post.findById(postId);
        const user=await User.findById(userId);
        if(!post){
            return res.status(404).json({message:"Post not found",success:false});
        }
        if(user.bookmarks.includes(postId)){
        await user.updateOne({$pull:{bookmarks:postId}});
        await user.save();
       return res.status(200).json({type:"unsaved",message:"Post unbookmarked successfully",success:true});
        }
        user.bookmarks.push(postId);
        await user.save();
        return    res.status(200).json({message:"Post bookmarked successfully",success:true});
    }   
    catch(error){
       return res.status(500).json({message:"Error bookmarking post",error:error.message,success:false});
    }
}
