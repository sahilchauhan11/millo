import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "@/redux/postSlice.js";
import { toast } from "sonner";

const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/post/allPost", { withCredentials: true });
               
                
                if (response.data.success) {
                 
                    toast.success("Posts fetched successfully");
                    dispatch(setPost(response.data.post));
                } else {
                    toast.error("Failed to fetch posts");
                }
            } catch (error) {
                toast.error("Error fetching posts");
              
            }
        };

        fetchAllPosts();
    }, []);
};

export default useGetAllPost;