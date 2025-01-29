import React from 'react'
import PostCard from './PostCard.jsx'
import Above from './Above.jsx'
import { useSelector } from 'react-redux'
const Post = () => {

  const posts=useSelector((state)=>state.post?.posts);

  return (
    <div className='overflow-y-auto w-full scrollbar-hide h-full overflow-x-hidden flex flex-col  items-center'>
     {posts?.map((post)=>(
      <PostCard key={post?._id} post={post}/>
     ))}
     
    </div>
  )
}

export default Post
