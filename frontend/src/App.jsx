import react, { useEffect } from 'react'
import './App.css'

import Signup from './components/signup.jsx'
import Home from './components/Home.jsx'
import Create from './components/Create.jsx'
import Login from './components/login.jsx'
import ChatPage from './components/ChatPage.jsx'
import Explore from './components/Explore.jsx'
import { useDispatch } from 'react-redux';
import EditProfile from './components/EditProfile.jsx'
import Notifications from './components/Notifications.jsx'
import Search from './components/Search.jsx'
import Signout from './components/Signout.jsx'
import Profile from './components/Profile.jsx'
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import MainLayout from './components/mainLay.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { setSocket } from './redux/socketSlice.js';
import { setOnlineUsers } from './redux/chatSlice.js';
import { setLikeNotification } from './redux/realTimeNSlice.js'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const {user} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {socket}=useSelector((store)=>store.socketio);
  useEffect(() => {
   

    if (user) {
      const socketio = io('http://localhost:8000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return async() => {
        socketio.close(); 
       
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element:<ProtectedRoute><MainLayout /></ProtectedRoute> ,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        { path: "/create", element: <Create /> },
        {

          path: '/profile/:id',
          element: <Profile />,
        },
        {

          path: '/account/edit',
          element: <EditProfile />,
        },
        {
          path: '/explore',
          element: <Explore />,
        },
        {
          path: '/chat',
          element: <ChatPage />,
        },
        {
          path: '/notifications',
          element: <Notifications />,
        },
        {
          path: '/search',
          element: <Search />,
        },

      ]
    },

    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/signout',
      element: <Signout />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
    <>


      <RouterProvider router={router} />
    </>
  )
}

export default App
