import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice.js";
import { toast } from "sonner";

const useGetProfile = ({userId}) => {
    const dispatch = useDispatch();


    useEffect(() => {
                const fetchProfile = async () => {
            try {
                
                const response = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, { withCredentials: true });
               
                console.log(response)
                if (response.data.success) {

                
                    
                    dispatch(setUserProfile(response.data.user));
                } else {
                    toast.error("Failed to fetch posts");
                }
            } catch (error) {
                toast.error("Error fetching posts");
              
            }
        };

        fetchProfile();
    }, [userId ]);
};

export default useGetProfile;