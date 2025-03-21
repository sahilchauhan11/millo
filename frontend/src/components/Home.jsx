import React, { useEffect } from 'react'
import RighSideBar from './RighSideBar.jsx'
import Feed from './Feed.jsx'
import useGetAllPost from '../hooks/useGetAllPost.jsx'
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from '@/redux/socketSlice.js'
import { io } from 'socket.io-client'

const Home = () => {
  useGetAllPost();
useGetSuggestedUsers();


  return (
    <div className='flex h-full w-full justify-center overflow-hidden'>
    <div className='w-[60%] h-full'>
      <Feed/>
    </div>
    <div className='w-fit px-2 h-full'>
        <RighSideBar/>
      </div>
    
    </div>
  )
}

export default Home
