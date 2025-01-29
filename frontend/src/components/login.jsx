import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice.js'

const Login = () => {
    
    const [loading,setLoading]=useState(false);
    const [input, setinput] = useState({
        
        email: "",
        password: ""
    })
    const navigate=useNavigate();

    const dispatch=useDispatch();
   const {user}=useSelector(state=>state.auth)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setinput({ ...input, [name]: value });
    }
    useEffect(() => {
      if(user){
        navigate("/")
      }
    
      
    }, [])
    
    const submitForm = async(e) => {
       
        e.preventDefault();
        setLoading(true);
        // Add your form submission logic here
        try {
            console.log("input")
            const response=await axios.post("http://localhost:8000/api/v1/user/login",input,{
                headers:{
                    "Content-Type":"application/json"
                },withCredentials:true
            })  
            // console.log(response);
            if(response.data.success){
            //    console.log(response.data)
                dispatch(setUser(response.data.user));
                toast.success(response.data.message);
                navigate ("/",{replace:true});
               
            }
            else {
                toast.error(response.data.message || "Login failed");
            }
            
        } catch (error) {
            // console.log(error)
            toast.error( "Login failed");
            
            
        }finally{
            setLoading(false);
            setinput({
                
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
                    <p>Login to continue</p>
                </div>
                <form  className='space-y-6' onSubmit={submitForm}>
                    
                    <div>
                        <Label htmlFor="email" className='block text-sm font-bold text-gray-700'>Email</Label>
                        <Input id="email" type="email" placeholder='Enter your email' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm ' name='email' onChange={handleInputChange} value={input.email} />
                    </div>
                    <div>
                        <Label htmlFor="password" className='block text-sm font-bold text-gray-700'>Password</Label>
                        <Input id="password" type="password" placeholder='Enter your password' className='mt-1 block w-full rounded-md border-gray-300 shadow-sm '
                            onChange={handleInputChange} value={input.password} name='password' />
                    </div>
                    {loading && <div className='flex items-center justify-center'>
                    signing...
                </div>}
                    <Button type='submit' className='w-full bg-slate-700 text-white'>Log In</Button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login;
