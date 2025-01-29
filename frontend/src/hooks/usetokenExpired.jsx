import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setUserProfile } from "@/redux/authSlice.js";
import { toast } from "sonner";
import { setPost, setSelectedPost } from "@/redux/postSlice";
import { setOnlineUsers } from "@/redux/chatSlice";
import { setSocket } from "@/redux/socketSlice";
import { useNavigate } from "react-router-dom";

const useTokenExpired = () => {
    const dispatch = useDispatch();

const navigate=useNavigate();
    useEffect(() => {
        console.log("token expired func is called")
                const checkToken = async () => {
            try {
                
                const response = await axios.get(`http://localhost:8000/api/v1/user/check`, { withCredentials: true });
                console.log("token expired func is called")
                console.log(response)
                if (!response.data.validToken) {
                    dispatch(setUser(null));
                    dispatch(setPost([]));
                    dispatch(setOnlineUsers([]));
                    dispatch(setSocket(null));
                    dispatch(setSelectedPost(null));
                    localStorage.removeItem('persist:root');
                    navigate('/login')
                }else{
                    console.log("booooyeah")
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    console.log("401 Unauthorized:", error.response.data);
                    dispatch(setUser(null));
                    dispatch(setPost([]));
                    dispatch(setOnlineUsers([]));
                    dispatch(setSocket(null));
                    dispatch(setSelectedPost(null));
                    localStorage.removeItem("persist:root");
                    navigate("/login");
                } else {
                    toast.error("An unexpected error occurred.");
                }
              
            }
        };

        checkToken();
    }, [ ]);
};

export default useTokenExpired;