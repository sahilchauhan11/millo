import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Create from './Create.jsx'
import { useSelector } from 'react-redux'

const Leftbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {likeNotification}=useSelector((state)=>state.realTimeNotification);
  return (
    <div className='w-full h-full flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
      <div className='w-[95%] flex flex-col items-center rounded-2xl h-[95%] py-2 bg-white'>
        <h1 className='text-4xl font-extrabold w-full font-serif flex justify-center items-center'>MILLO</h1>
        <div className='flex flex-col items-center  h-full py-5'>

          <Link to="/" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded-md font-serif gap-2 hover:bg-gray-200'>
            <span class="material-symbols-outlined">
              home
            </span>   home
          </Link>
          <Link to="/search" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl 
                p-4 font-semibold rounded-md font-serif gap-2 hover:bg-gray-200'>
            <span class="material-symbols-outlined">
              search
            </span> search
          </Link>
          <Link to="/explore" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded-md font-serif gap-2 hover:bg-gray-200'>
            <span class="material-symbols-outlined">
              explore
            </span>  explore
          </Link>
          <Link to="/chat" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded-md font-serif gap-2 hover:bg-gray-200'>
            <span class="material-symbols-outlined">
              chat
            </span>   Chats
          </Link>
          <Link to="/notifications" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded-md font-serif gap-2    '>
            <span class="material-symbols-outlined">
              notifications
            </span>  Notifications
            {likeNotification?.length>0&&<span className='w-5 h-5 bg-red-500 rounded-full absolute top-0 right-0'>likeNotification?.length</span>}
          </Link>
          <div className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded font-serif gap-2 hover:bg-gray-200' onClick={() => setOpen(true)} >
            <span class="material-symbols-outlined">
              add
            </span>  Create
          </div>
          <Link to={`/profile/${user?._id}`} className='bg-transparent flex justify-start w-[90%] items-center text-gray-700 text-1xl p-4 font-semibold rounded-md font-serif gap-2 hover:bg-gray-200'>  <div className='w-10 h-10 rounded-full bg-black'><img className='w-full h-full rounded-full object-cover' src={user?.profilePicture ? user.profilePicture : "/person_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png"} alt="pic" /></div> Profile</Link>
          <Link to="/signout" className='bg-transparent flex justify-start w-[90%] text-gray-700 text-1xl p-4 font-semibold rounded font-serif gap-2 hover:bg-gray-200'>  <span class="material-symbols-outlined">
            logout
          </span>  Logout</Link>
        </div>
        <Create open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}

export default Leftbar
