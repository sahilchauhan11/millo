import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AtSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import { setFollowed, setFollowing, setUnFollow, setUnFollowing } from '../redux/authSlice.js'
import useGetProfile from '@/hooks/useGetProfile'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
const Profile = () => {
  const params = useParams();
  const userId = params.id;
  const [active, setActive] = useState("posts");
  const dispatch = useDispatch();
  useGetProfile({ userId: userId });
  const handleActive = (e) => {
    setActive(e);

  }


  const { userProfile } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)
  const isLoggedInProfile = params.id === user?._id;
  const isFollowing = userProfile?.followers?.includes(user?._id);
  const postToShow = active === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  const handlefollow = async () => {
    try {
      const response = await axios.get(`https://millo-ydtw.onrender.com/api/v1/user/followOrUnfollow/${userId}`, {
        withCredentials: true
      })
      if (response.data.success) {
        dispatch(setFollowed(user?._id))
        dispatch(setFollowing(userProfile?._id))
        toast.success("followed successfully")
      }
      else if (response.data.unfollow) {
        dispatch(setUnFollow(user?._id))
         dispatch(setUnFollowing(userProfile?._id))
        toast.success("unfollowed successfully")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className='flex h-full w-full justify-center overflow-hidden my-3'>
      {/* page */}
      <div className='w-[90%] h-full flex flex-col gap-2'>
        {/* avatar */}
        <div className='h-[20%]  w-full flex justify-center  items-center'>

          <Avatar className="h-[100px] w-[100px] rounded-full flex items-center justify-center">
            <AvatarImage className="w-full h-full rounded-full object-cover bg-black" src={userProfile?.profilePicture ? userProfile.profilePicture : ""} />
            <AvatarFallback className="h-full bg-black w-full flex items-center rounded-[10px] justify-center text-2xl">
              <img src="/person_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png" alt="" />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-start items-center gap-3 w-full'>
            <div className='text-xl font-bold '>
              {userProfile?.username || ""}
            </div>

            <div className='flex w-fit flex-col gap-3'>
              {isLoggedInProfile ? (< div className='flex gap-3'>
                <Link to="/account/edit"><Button variant="secondary" className=' hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl'>Edit Profile</Button></Link>
                <Button variant="secondary" className='hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl'>Add Story</Button>
                <Button variant="secondary" className='hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl'>Ad tools</Button>
              </div>) : (isFollowing ? < div className='flex gap-3'><Button onClick={(e) => { handlefollow() }}  variant="secondary" className=' hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl '>Unfollow</Button>
                <Button variant="secondary" className='hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl bg-blue-500'>Message</Button>

              </div> :
                <Button onClick={(e) => { handlefollow() }} variant="secondary" className=' hover:bg-gray-500 w-[100px] hover:text-white text-xs rounded-xl bg-blue-500'>Follow</Button>
              )}
              <div className='flex gap-3'>
                <p className='text-xl font-semibold  '>{userProfile?.posts?.length || 0} <span className='text-sm '>Posts</span></p>
                <p className='text-xl font-semibold  '>{userProfile?.followers?.length || 0} <span className='text-sm '>Followers</span></p>
                <p className='text-xl font-semibold  '>{userProfile?.following?.length || 0} <span className='text-sm '>Following</span></p>
              </div>
            </div>
          </div>


        </div>

        <div className='flex flex-col gap-3 h-[25%] w-full '>
          <span className='text-sm flex items-center gap-2 justify-center bg-gray-600 text-black   w-[30%] rounded-xl p-2 font-bold'><AtSign />{userProfile?.username}</span>
          <span className='text-xl font-semibold'>{userProfile?.bio || ""}</span>


        </div>

        <div className='flex flex-col gap-3 border-t-2 border-t-gray-500 h-[60%] w-full'>
          <div className='flex gap-6 cursor-pointer'>
            <span onClick={() => handleActive("posts")} className={`text-xl    ${active === "posts" ? "font-bold" : ""}`}>Posts</span>
            <span onClick={() => handleActive("saved")} className={`text-xl  ${active === "saved" ? "font-bold" : ""}`}>saved</span>
            <span onClick={() => handleActive("reels")} className={`text-xl   ${active === "reels" ? "font-bold" : ""}`}>reels</span>
            <span onClick={() => handleActive("tagged")} className={`text-xl   ${active === "tagged" ? "font-bold" : ""}`}>tagged</span>



          </div>
          <div className='
w-full h-full flex-wrap overflow-y-auto scrollbar-hide flex gap-4'>
            {postToShow?.map((post) => {
              return (
                <div key={post?._id} className='w-[300px] h-[300px] flex justify-center items-center '>
                  <img src={post?.image} alt={post?.id} className='my-3 object-cover aspect-square rounded-xl' />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
