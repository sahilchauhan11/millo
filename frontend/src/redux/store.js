import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
  
import { combineReducers } from 'redux';
import postSlice from "./postSlice.js";
import socketSlice from "./socketSlice.js";
import chatSlice from "./chatSlice.js";
import realTimeNotificationSlice from "./realTimeNSlice.js";
 
 
  const rootReducer = combineReducers({
    auth: authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:realTimeNotificationSlice    
  });
  const store = configureStore({
    reducer: rootReducer,
  });
  
  
  export { store };
  
