import React from 'react'
import Post from './Post'
const Feed = () => {
  return (
    <div className='w-full bg-pink-700 overflow-scroll scrollbar-hide h-full'>
      <Post/>
    </div>
  )
}

export default Feed
