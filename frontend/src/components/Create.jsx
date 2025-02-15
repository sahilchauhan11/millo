import React, { useState, useRef } from 'react'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPost } from '@/redux/postSlice.js';
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { fileDataUri } from '@/lib/utils.js';
import { useSelector } from 'react-redux';

const Create = ({ open, setOpen }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [previewfile, setPreviewfile] = useState(null);
  const dispatch=useDispatch();
  const posts=useSelector((state)=>state.post.posts);
const [load, setload] = useState(false)
  const createPost = async (e) => {
    if(load){
      return;
    }
    
    try{
      const formData=new FormData();
      setload(true);
      formData.append("caption",caption);
      formData.append("image",file);
     
        const response = await axios.post("https://millo-ydtw.onrender.com/api/v1/post/addpost", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        });
        
       
  
  if(response.data.success){
    dispatch(setPost([response.data.post,...posts]));
     toast.success(response.data.message);
     setOpen(false); 
     setCaption("");
     setFile(null);
     setPreviewfile(null);
     setload(false);
  }}
  catch(error){
  
    toast.error(error.response.data.message);
  }
  }
  const handleCaption = (e) => {
 
    setCaption(e.target.value);
  }
  const handleFile = async (e) => {
    const File = e.target.files[0];
    setFile(File);
    

    const datauri = await fileDataUri(File);
    if (!datauri) {
     
      return;
    }
    
    setPreviewfile(datauri);

  }
  const fileRef = useRef();

  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            Create Post
          </DialogHeader>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1>username</h1>
              <p>bio....</p>
            </div>
          </div>
          <Textarea placeholder="Type your message here." onChange={(e) => handleCaption(e)} />
          <div className='flex items-center justify-center'>
            {previewfile && <img src={previewfile} alt="preview" className='w-[50%]  object-cover' />}
            <Input onChange={(e) => handleFile(e)} type="file" className='hidden' ref={fileRef} />
          </div>
          <Button className='w-fit mx-auto hover:bg-gray-[#0095f6]' onClick={() => fileRef.current.click()}>select from computer</Button>
          {previewfile && <Button className='bg-blue-700 w-fit rounded-lg mx-auto hover:bg-gray-[#0095f6]' onClick={createPost}>create</Button>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Create
