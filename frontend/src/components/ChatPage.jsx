import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedUser } from '../redux/authSlice'
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import Messages from './Messages'
import { MessageCircleCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setMessages } from '../redux/chatSlice'

const ChatPage = () => {
  const [textmessage, settextmessage] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const { user, suggestedUsers, selectedUser } = useSelector((state) => state.auth)
  const onlineUsers = useSelector((state) => state.chat.onlineUsers)
  const { messages } = useSelector((state) => state.chat)
  const socket = useSelector((state) => state.chat.socket);

  const handleSendMessage = async (receiverId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/message/send/${receiverId}`, {
        message: textmessage
      }, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data?.newMessage]))
        settextmessage("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null))
    }
  }, [])









  return (<>
    <div className='flex h-full justify-between w-full bg-white'>
      <section className='w-[25%] flex flex-col justify-center items-center py-5'>
        <div className='h-[20%] px-2 w-full flex flex-col justify-center items-start gap-4'>
          <Avatar className="h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <AvatarImage className="rounded-full object-cover" src={user?.profilePicture ? user.profilePicture : ""} />
            <AvatarFallback className="h-full w-full flex items-center justify-center text-2xl">
              <span class="material-symbols-outlined">
                person
              </span>
            </AvatarFallback>
          </Avatar>
          <div className='flex justify-start items-center gap-3 w-full'>
            <div className='text-xl font-semibold'>
              {user?.username}
            </div>
          </div>
        </div>
        <hr className='w-full h-px my-8 bg-gray-400 border-0 rounded' />
        <div className='flex w-full flex-col h-[80vh] gap-3 overflow-y-auto scrollbar-hide items-center justify-start'>
          {
          suggestedUsers && suggestedUsers.map((sugguser) => {
            const isOnline = onlineUsers?.includes(sugguser?._id);
            return (
              <div onClick={() => dispatch(setSelectedUser(sugguser))} key={sugguser._id} className='flex items-center w-full justify-center hover:bg-gray-200 rounded-xl cursor-pointer'>
                <div className='my-3 flex items-center gap-5 w-full'>
                  {sugguser.profilePicture ? <img src={sugguser.profilePicture} alt={sugguser.username} className='w-10 h-10 rounded-full' /> : <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-xl font-semibold font-mono'>{sugguser.username.charAt(0)}</span></div>}
                  <div className='flex flex-col'><h1 className='text-xl font-semibold font-mono'>{sugguser.username}</h1>
                    <span className={`text-xs font-mono font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>{isOnline ? 'online' : 'offline'}</span></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className='w-[75%] bg-red-500'>
        {!selectedUser ? <div className='flex flex-col h-full justify-center items-center w-full'>
          <MessageCircleCode className='w-[30%] h-[30%]' />
          <h1 className='text-xl font-bold text-gray-800'>Select a user to start chat</h1>
        </div> : <div className='flex flex-col w-full h-full p-3 rounded-xl bg-white'>
          <div className='p-3 h-[10%] flex items-center gap-5'>
            {selectedUser.profilePicture ? <img src={selectedUser.profilePicture} alt={selectedUser.username} className='w-10 h-10 rounded-full' /> : <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
              <span className='text-2xl font-semibold font-mono'>{selectedUser.username.charAt(0)}</span></div>}
            <div className='flex flex-col'><h1 className='text-2xl font-semibold font-mono'>{selectedUser.username}</h1>
            </div>
            <Link to={`/profile/${selectedUser?._id}`} className='text-sm text-gray-500'>View Profile</Link>
          </div>
          <hr className='w-full h-px my-2 bg-gray-400 border-0 rounded' />
          <div className='flex flex-col w-full h-[90%] bg-slate-600'>
            <Messages selectedUser={selectedUser} />
            <div className='flex items-center justify-center w-full h-[10%]'>
              <input value={textmessage} onChange={(e) => settextmessage(e.target.value)} placeholder='type your message here...' type="text" className='w-full h-[90%] bg-pink-600 p-3 focus:outline-none border-none' />
              <Button onClick={() => {
                console.log("sending message");
                console.log(selectedUser?._id);
                handleSendMessage(selectedUser?._id);
              }} className='bg-blue-500 rounded-full px-4 py-2 w-fit'>
                Send
              </Button>
            </div>
          </div>
        </div>}
      </section>
    </div>
  </>
  )
}

export default ChatPage;
