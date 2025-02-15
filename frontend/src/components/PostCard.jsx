import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { setSelectedPost } from '@/redux/postSlice.js';
import CommentDialogue from './CommentDialogue.jsx';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setPost } from '@/redux/postSlice.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"


const PostCard = ({ post }) => {
    useEffect(() => {
    if (post) {
      setComments(post.comments);
    }
  }, [post]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.posts);
  const [value, setValue] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(post.likes.length);
  const [like, setLike] = useState(post.likes.includes(user._id));
  const handleClose = () => {
    setOpen(false);
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const [view, setView] = useState(comments.length);
  
  const handleOpen = () => {
    setOpen(true);
  }

  const handleCloseComment = () => {
    setOpenComment(false);
  }
  const CommentHandleSubmit = async (e) => {
    e.preventDefault();
    try{
    let res = await axios.post(`http://localhost:8000/api/v1/post/${post?._id}/comment`, { comment: value }, {
      withCredentials: true, headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res.data);

    if (res.data.success) {
      setView(view+1);
      const updatedPostComment = [...comments, res.data.comment];
      setComments(updatedPostComment);
      const updatedPosts = posts.map((p) => {
        if (p?._id === post?._id) {
          return { ...p, comments: updatedPostComment };
        }
        return p;
      });
      console.log(updatedPosts);
      console.log(post?._id);
      dispatch(setPost(updatedPosts));
      toast.success(res.data.message);
    } 
      setValue("");}
    catch(error){
    
      toast.error(error.response.data.message);
    }
  }

  const postDeletehandle = async (e) => {
    try {
      console.log(post?._id);
      let res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true });


      if (res.data.success) {
        const updatedPosts = posts.filter((p) => p?._id !== post?._id);
        dispatch(setPost(updatedPosts));
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    finally {
      setOpen(false);
    }

  }
  const bookmarkHandeler=async()=>{
    try {
      const  res = await axios.get(`http://localhost:8000/api/v1/post/bookmark/${post?._id}`, { withCredentials: true });
      if(res.data.success){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }
  const likeOrDislikeHandler = async (e) => {
    try {
      console.log(post.likes.length);
      console.log(post?._id);
      let res;
      if (!like) {
        res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/like`, { withCredentials: true });
        console.log(res);
        setPostLikeCount(postLikeCount + 1);
        const updatedPosts = posts.map((p) => {
          if (p?._id === post?._id) {
            return { ...p, likes: [...p.likes, user._id] };
          }
          return p;
        });
        dispatch(setPost(updatedPosts));

      }
      else {
        res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/dislike`, { withCredentials: true });
        setPostLikeCount(postLikeCount - 1);
        const updatedPosts = posts.map((p) => {
          if (p?._id === post?._id) {
            return { ...p, likes: p.likes.filter((id) => id !== user._id) };
          }
          return p;
        });
        dispatch(setPost(updatedPosts));
      }
      console.log(res);
      if (res.data.success) {
        if (!like) {

          setLike(true);
        }
        else {
          setLike(false);
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='border-2 h-[70vh] w-[50%] border-gray-300 rounded-xl p-4 m-2 relative flex flex-col items-center '
    >
      <div className='flex h-[10%] justify-between items-center '>
        <div className='flex  justify-center items-center gap-2'>
          <Avatar>
            <AvatarImage src={post?.owner?.profilePicture} />
            <AvatarFallback className='bg-gray-300 text-gray-500'>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-lg font-semibold'>{post?.owner?.username}</h1>
            <p className='text-sm text-gray-500'>2 days ago</p>
          </div>
        </div>
       {post?.owner?._id === user._id ? <div><button onClick={handleOpen} className='text-sm p-1 text-gray-700'>
          <span class="material-symbols-outlined">
            more_vert
          </span>
        </button></div> : ""}
      </div>

      <div className='w-[90%] h-[60%] flex justify-center items-center py-2'>
        <img  src={post?.image} className='aspect-square  object-cover w-[70%]' alt="img" />
      </div>
      <div className='flex flex-col h-[20%] justify-center items-start  px-4 py-2'>
        <div className=' flex justify-between items-center gap-2 w-full my-2 '>
          <div className='flex justify-center items-center gap-2'>
            <button onClick={likeOrDislikeHandler} >
              {like ? <Heart className='text-red-500 fill-red-500' /> : <span class="material-symbols-outlined">favorite</span>}
            </button>
            <button onClick={() => { setOpenComment(true); dispatch(setSelectedPost(post)); }} class="material-symbols-outlined">
              chat
            </button>
            <button class="material-symbols-outlined">
              share
            </button></div>
          <span onClick={()=>{
            bookmarkHandeler()
          }} class="material-symbols-outlined">
            bookmark
          </span>
        </div>
        <div>
          <p className='text-sm text-gray-800'>{postLikeCount} likes</p>
          <p className='text-sm text-gray-500'>{post?.caption}</p>
        </div>

        {view ? <button onClick={() => { setOpenComment(true) ;
          dispatch(setSelectedPost(post));
        }} className='text-sm p-1 text-gray-700'>view  all {comments.length} comments</button> : ""}
      </div>
      <form onSubmit={CommentHandleSubmit} className='flex justify-center items-center gap-2 w-full h-[10%]'>
        <input onChange={handleChange} value={value} type="text" name="" id="" placeholder='Add a comment' className='w-full p-2 border-2 border-gray-300 rounded-xl' />
        {value != "" ? <button type='submit' className='text-sm p-2 text-gray-700'>
          <span class="material-symbols-outlined">
            send
          </span>
        </button> : ""}
      </form>
      <Dialog open={open} onOpenChange={setOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">

        <DialogContent onInteractOutside={handleClose}>
          <button className='text-sm p-1 text-gray-700 hover:bg-red-700' onClick={postDeletehandle}>delete</button>
        </DialogContent>
      </Dialog>
      <CommentDialogue open={openComment} onOpenChange={setOpenComment}/>
    </div>
  )
}

export default PostCard
