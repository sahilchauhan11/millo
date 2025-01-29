import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import { persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    
import { combineReducers } from 'redux';
import postSlice from "./postSlice.js";
import socketSlice from "./socketSlice.js";
import chatSlice from "./chatSlice.js";
import realTimeNotificationSlice from "./realTimeNSlice.js";
 
 const persistConfig = {
    key: 'root',
    storage,
  version:1,
  };
  const rootReducer = combineReducers({
    auth: authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:realTimeNotificationSlice    
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  
  export { store, persistor };
  
