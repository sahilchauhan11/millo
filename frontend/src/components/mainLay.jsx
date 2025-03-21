import React, { useState } from 'react'
import { Link,Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Leftbar from './Leftbar.jsx'
import RighSideBar from './RighSideBar.jsx'
import { useSelector } from 'react-redux'
const MainLayout = () => {
  
  const {user} = useSelector((state) => state.auth);
  
  return (
    <div className='flex  h-screen w-[100vw] '>
      <div className='w-fit h-full'>
      <Leftbar/>
      </div>
      
      <div className=' h-full'>
        <Outlet/>
      </div>
    
      
    </div>


  )
}

export default MainLayout
