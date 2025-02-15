import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'


const Signup = () => {
    const [loading,setLoading]=useState(false)
    const [input, setinput] = useState({
        username: "",
        email: "",
        password: ""
    })
    const {user}=useSelector(state=>state.auth)
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const changeUsernameHandler = (e) => {
        setinput({ ...input, username: e.target.value })
        console.log(input);
    }

    const changeEmailHandler = (e) => {
        setinput({ ...input, email: e.target.value })
        console.log(input);
    }

    const changePasswordHandler = (e) => {
        setinput({ ...input, password: e.target.value })
        console.log(input);
    }
    useEffect(() => {
        if(user){
          navigate("/")
        }
      
        
      }, [])
    const submitForm = async(e) => {
        e.preventDefault();
        console.log("submit");
        setLoading(true);
        // Add your form submission logic here
        try {
            
            const response=await axios.post("https://millo-ydtw.onrender.com/api/v1/user/register",input,{
                headers:{
                    "Content-Type":"application/json"
                },withCredentials:true
            })
            if(response.data.success){
                toast.success(response.data.message);
                console.log("Navigating to home...");

                navigate("/", { replace: true });
                console.log("Navigation complete.");
                dispatch(setUser(response.data.user));
            }
              
            
        } catch (error) {
            console.log(error,"not working")
            toast.error(error.message)
            
            
        }finally{
            setLoading(false);
            setinput({
                username: "",
                email: "",
                password: ""
               });
        }
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl'>
                <div className='text-center'>
                    <h1 className='text-4xl font-extrabold text-gray-900'>MILLO</h1>

                    <p className='mt-2 text-xl font-medium text-gray-600'>Look Share Connect</p>
                    <p>Sign up to continue</p>
                </div>
                <form  className='space-y-6' onSubmit={submitForm}>
                    <div>
                        <Label htmlFor="username" className='block text-sm font-bold text-gray-700'>Username</Label>
                        <Input id="username" type="text" placeholder='Enter your username' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm ' onChange={(e) => { changeUsernameHandler(e) }} value={input.username} />
                    </div>
                    <div>
                        <Label htmlFor="password" className='block text-sm font-bold text-gray-700'>Password</Label>
                        <Input id="password" type="password" placeholder='Enter your password' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm '
                            onChange={changePasswordHandler} value={input.password} />
                    </div>
                    <div>
                        <Label htmlFor="email" className='block text-sm font-bold text-gray-700'>Email</Label>
                        <Input id="email" type="email" placeholder='Enter your email' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm ' onChange={changeEmailHandler} value={input.email} />
                    </div>
                    {loading && <div className='flex items-center justify-center'>
                    signing...
                </div>}
                    <Button type='submit' className='w-full bg-slate-700 text-white'>Sign Up</Button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
               
            </div>
        </div>
    )
}

export default Signup;
