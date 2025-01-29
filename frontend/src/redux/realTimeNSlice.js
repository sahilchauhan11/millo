import { createSlice } from "@reduxjs/toolkit";

const realTimeNotificationSlice = createSlice({
    name: "realTimeNotification",
    initialState: {
        likeNotification: [],
        
    },
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === "like") state.likeNotification.push(action.payload);
           
            else if (action.payload.type === "dislike") state.likeNotification=state.likeNotification.filter((notification)=>notification.userId!==action.payload.userId);
          
        }
    }
})
export default realTimeNotificationSlice.reducer;
export const { setLikeNotification } = realTimeNotificationSlice.actions;

