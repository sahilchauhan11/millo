import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        selectedPost:null,
       
        
    },reducers:{
        setPost(state,action){
            state.posts=(action.payload);
        },
        setSelectedPost(state,action){
            state.selectedPost=(action.payload);
        }
    }
})
export let {setPost,setSelectedPost} = postSlice.actions;
export default postSlice.reducer;
