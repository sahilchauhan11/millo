import React from 'react'
import { useSelector } from 'react-redux'
import useGetAllMessages from '../hooks/useGetAllMessages'
import useGetRealTimeMessages from '@/hooks/useGetRealTimeMessages'
const Messages = ({selectedUser}) => {
  useGetRealTimeMessages();
  useGetAllMessages()
  const {messages}=useSelector((state)=>state.chat);

  const {user}=useSelector((state)=>state.auth)
  return (
    <div className='overflow-y-auto scrollbar-hide h-[90%] w-full bg-pink-300 p-4'>
      
     {messages&&messages.map((item)=>{
      
    return (item?.senderId===selectedUser?._id?
    <div key={item._id } className='flex flex-col items-start justify-center bg-gray-300 rounded-xl p-2 text-black '>
    {item?.content}
      </div>:<div key={item?._id} className='flex flex-col items-end justify-center  bg-pink-300 rounded-xl p-2 text-black '>
    {item?.content}
      </div>
    ) })}
    </div>
  )
}

export default Messages;
