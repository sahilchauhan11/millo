import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment.jsx'
import axios from 'axios'
import { toast } from 'sonner'
import { setPost,setSelectedPost } from '@/redux/postSlice.js'

const CommentDialogue = ({ open, onOpenChange }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector(store => store.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {

    let res = await axios.post(`http://localhost:8000/api/v1/post/${selectedPost._id}/comment`, { comment: text }, {
        withCredentials: true, headers: {
          "Content-Type": "application/json"
        }
      });
      
  
      if (res.data.success) {
        const updatedPostComment = [...comment, res.data.comment];
        setComment(updatedPostComment);
        const updatedPosts = posts.map((p) => {
          if (p._id === selectedPost._id) {
            return { ...p, comments: updatedPostComment };
          }
          return p;
        });
      
        dispatch(setPost(updatedPosts));
      
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setText("");
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => onOpenChange(false)} className="max-w-5xl p-0 flex flex-col">
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img
              src={selectedPost?.image}
              alt="post_img"
              className='w-full h-full object-cover rounded-l-lg'
            />
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex gap-3 items-center'>
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs'>{selectedPost?.author?.username}</Link>
                  {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                    Unfollow
                  </div>
                  <div className='cursor-pointer w-full'>
                    Add to favorites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              {
                comment.map((comment) => <Comment key={comment._id} comment={comment} />)
              }
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default CommentDialogue;
