import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/authSlice';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import Messages from './Messages';
import { MessageCircleCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setMessages, setOnlineUsers } from '../redux/chatSlice';
const ChatPage = () => {
  const [textmessage, settextmessage] = useState('');
  const dispatch = useDispatch();
  const { user, suggestedUsers, selectedUser } = useSelector((state) => state.auth);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const { messages } = useSelector((state) => state.chat);
  const socket = useSelector((state) => state.chat.socket);

  const handleSendMessage = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://millo-ydtw.onrender.com/api/v1/message/send/${receiverId}`,
        { message: textmessage },
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data?.newMessage]));
        settextmessage('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {


    return () => {
      
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className='flex h-screen w-full bg-gray-100'>
      <section className='w-1/4 flex flex-col p-5 bg-white shadow-md border-r'>
        <div className='flex flex-col items-center pb-5 border-b'>
          <Avatar className='h-14 w-14 rounded-full'>
            <AvatarImage src={user?.profilePicture || ''} className='rounded-full object-cover' />
            <AvatarFallback className='h-full w-full flex items-center justify-center text-xl bg-gray-200 p-4'>
              {user?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h2 className='mt-3 text-lg font-semibold'>{user?.username}</h2>
        </div>
        <div className='flex flex-col h-full overflow-y-auto scrollbar-hide mt-3'>
          {suggestedUsers?.map((sugguser) => {
            const isOnline = onlineUsers?.includes(sugguser?._id);
            return (
              <div
                key={sugguser._id}
                onClick={() => dispatch(setSelectedUser(sugguser))}
                className='flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-all'
              >
                <Avatar className='h-10 w-10 rounded-full'>
                  <AvatarImage src={sugguser.profilePicture || ''} className='rounded-full object-cover' />
                  <AvatarFallback className='bg-gray-300'>{sugguser.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <h1 className='text-lg font-semibold'>{sugguser.username}</h1>
                  <span className={`text-xs font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className='w-3/4 flex flex-col bg-white shadow-md rounded-lg'>
        {!selectedUser ? (
          <div className='flex flex-col h-full justify-center items-center'>
            <MessageCircleCode className='w-20 h-20 text-gray-400' />
            <h1 className='text-lg font-bold text-gray-700 mt-3'>Select a user to start chatting</h1>
          </div>
        ) : (
          <div className='flex flex-col w-full h-full'>
            <div className='flex items-center gap-4 p-4 border-b'>
              <Avatar className='h-12 w-12 rounded-full'>
                <AvatarImage src={selectedUser.profilePicture || ''} className='rounded-full object-cover' />
                <AvatarFallback className='bg-gray-300'>{selectedUser.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h1 className='text-xl font-semibold'>{selectedUser.username}</h1>
                <Link to={`/profile/${selectedUser?._id}`} className='text-sm text-blue-500 hover:underline'>
                  View Profile
                </Link>
              </div>
            </div>
            <div className='flex flex-col flex-grow overflow-y-auto bg-gray-50 p-4'>
              <Messages selectedUser={selectedUser} />
            </div>
            <div className='flex items-center p-3 border-t bg-gray-100'>
              <input
                value={textmessage}
                onChange={(e) => settextmessage(e.target.value)}
                placeholder='Type your message...'
                className='flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <Button
                onClick={() => handleSendMessage(selectedUser?._id)}
                className='ml-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
