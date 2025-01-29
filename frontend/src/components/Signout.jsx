import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser,setSelectedUser } from '../redux/authSlice.js'
import { setPost } from '../redux/postSlice.js'
import { setSelectedPost } from '../redux/postSlice.js'
import { setOnlineUsers } from '../redux/chatSlice.js'
import { setSocket } from '../redux/socketSlice.js'
const Signout = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const handleLogout = async() => {
        
        try{
            let response = await axios.get("http://localhost:8000/api/v1/user/logout",{
                withCredentials:true
            })
            console.log(response)
           
            if(response.data.success){
console.log("working")
                dispatch(setUser(null));
                dispatch(setPost([]));
                dispatch(setOnlineUsers([]));
                dispatch(setSocket(null));
                dispatch(setSelectedPost(null));
                localStorage.removeItem('persist:root');
                toast.success(response.data.message)
                navigate("/login");
            }
        }catch(err){
            console.log(err)
            toast.error(err?.message);
        }
    }
  return (
    
   
       <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 '>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-xl h-[50vh] shadow-2xl flex flex-col items-center'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>MILLO</h1>

                    <p className='mt-2 text-xl font-medium text-gray-600'>Look Share Connect</p>
                   
                </div>
                
                <p className='text-xl font-medium w-[80%] text-center text-gray-600'> Are you sure want to logout ?</p>
                <div className='flex justify-center gap-4'>
                <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>confirm</button>
                <Link to="/" className='bg-green-500 text-white px-4 py-2 rounded-lg'>back</Link>
                </div>
               
            </div>
        </div>
    
  )
}

export default Signout
