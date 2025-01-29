import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    console.log(comment);
  return (
    <div className='my-2'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={comment.owner.profilePicture} />
          <AvatarFallback>
           CN
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
            <p className='text-sm font-bold'>{comment.owner.username}</p>
            <p className='text-sm text-gray-500'>{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
