import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(state => state.auth);
    console.log("got", suggestedUsers);
    return (
        <div className='flex flex-col my-10 px-4 w-full max-w-lg mx-auto'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-xl font-semibold text-gray-900'>Suggested Users</h1>
                <Link to="/suggested-users" className='text-blue-600 hover:underline'>View All</Link>
            </div>
            {suggestedUsers?.map(user => {
                return (
                    <div className='w-full flex items-center bg-white shadow-md rounded-lg p-3 mb-3 hover:bg-gray-100 transition duration-200'>
                        <div className='flex items-center w-full'>
                            <div className='w-14 h-14 flex justify-center items-center'>
                                <Link to={`/profile/${user._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user.owner?.profilePicture ? user.owner.profilePicture : ""} />
                                        <AvatarFallback className='bg-gray-300 text-gray-600'>
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                            </div>
                            <div className='flex flex-col ml-3 flex-1'>
                                <p className='text-sm font-medium text-gray-900'>{user.username}</p>
                            </div>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-lg text-sm transition duration-200'>Follow</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SuggestedUsers;
