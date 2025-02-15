import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "@/redux/authSlice.js";
import { toast } from "sonner";

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
            const fetchSuggestedUsers = async () => {
            try {
                console.log("fetchSuggestedUsers");
                const response = await axios.get("https://millo-ydtw.onrender.com/api/v1/user/suggestions", { withCredentials: true });
               console.log("suggested user",response)
                
                if (response.data.success) {
             dispatch(setSuggestedUsers(response.data.users));
                }
            } catch (error) {
                toast.error("Error fetching posts");
              
            }
        };

        fetchSuggestedUsers();
    }, []);
};

export default useGetSuggestedUsers;