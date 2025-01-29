import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers.jsx'
const RighSideBar = () => {
  const {user}=useSelector(state=>state.auth);
  return (
    <div className='h-full cursor-pointer bg-red-500 scrollbar-hide py-4 w-full'>
      <div className='flex items-center w-full justify-evenly'>
        <div className='w-[20%] flex justify-center items-center'>
       <Link to={`/profile/${user?._id}`}>
       <Avatar>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>
           CN
          </AvatarFallback>
        </Avatar>
       </Link>
       </div>
        <div className='flex flex-col w-[70%] items-start justify-center'>
            <p className='text-sm font-bold'>{user?.username}</p>
            <p className='text-sm text-gray-500'>{user?.bio?user.bio:"bio  here..."}</p>
        </div>
      </div>
      <SuggestedUsers/>
    </div>
  )
}

export default RighSideBar
