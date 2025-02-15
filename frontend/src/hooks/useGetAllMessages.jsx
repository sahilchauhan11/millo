import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessages } from "@/redux/chatSlice.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
const useGetAllMessages = () => {
    const dispatch = useDispatch();
const {selectedUser}=useSelector((state)=>state.auth)
    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                const response = await axios.get(`https://millo-ydtw.onrender.com/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });

                
                if (response.data.success) {
                 
                    
                    dispatch(setMessages(response?.data?.message));
                }
            } catch (error) {
                toast.error("Error fetching messages");
              
            }
        };

        fetchAllMessages();
    }, [selectedUser]);
};

export default useGetAllMessages;