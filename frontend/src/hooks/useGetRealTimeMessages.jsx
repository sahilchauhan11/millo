import react,{ useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessages } from "@/redux/chatSlice.js";
import { useSelector } from "react-redux";
 


const useGetRealTimeMessages = () => {
    const dispatch = useDispatch();
    const {socket}=useSelector((state)=>state.socketio)
    const{messages}=useSelector((state)=>state.chat)
    useEffect(() => {
        socket?.on("newMessage",(message)=>{ 
            console.log("socket called")
            dispatch(setMessages([...messages,message]))
        })
        return ()=>{
            socket?.off("newMessage")
        }
    }, [dispatch,socket]);
};

export default useGetRealTimeMessages;