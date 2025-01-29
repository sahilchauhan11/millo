import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(state => state.auth);
    console.log("got", suggestedUsers);
    return (
        <div className='flex flex-col my-10'>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Suggested Users</h1>
                <Link to="/suggested-users">View All</Link>
            </div>
            {suggestedUsers?.map(user => {
                return (
                    <div className='h-full cursor-pointer bg-red-500 scrollbar-hide py-4 w-full'>
                        <div className='flex items-center w-full justify-evenly'>
                            <div className='flex h-[60px] items-center justify-between p-4 bg-rose-600'>
                            <div className='w-[20%] flex justify-center items-center'>
                                <Link to={`/profile/${user._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user.owner?.profilePicture?user.owner.profilePicture:""} />
                                        <AvatarFallback>
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                            <div className='flex flex-col h-full w-[70%] bg-white items-center justify-center'>
                                <p className='text-sm font-bold'>{user.username}</p>
                               
                                
                            </div>
                            </div>
                            <button className='bg-blue-500 h-[60px] w-[30%] text-white px-2 text-sm rounded-md'>Follow</button>
                        </div>
                    </div>
                )
            })}

        </div>

    )
}

export default SuggestedUsers;
