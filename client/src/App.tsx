import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  setCurrentUserEmail,
  setCurrentUserLikedPosts,
  setCurrentUserName,
  setCurrentUserPosts,
} from '../redux/currentUserSlice/slice';
import { useQuery } from 'react-query';

function App() {
  axios.defaults.baseURL = `http://localhost:8080`;
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  const getProfile = async () => {
    try {
      const { data } = await axios.get('/getProfile');
      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery('data', getProfile);
  useEffect(() => {
    dispatch(setCurrentUserEmail(data?.email));
    dispatch(setCurrentUserName(data?.name));
    dispatch(setCurrentUserPosts(data?.posts));
    dispatch(setCurrentUserLikedPosts(data?.liked_posts));
  }, [data]);

  console.log(data);

  const getAllTweets = async () => {
    try {
      const { data } = await axios.get('/getAllTweets');
      if (data) {
        // console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // getProfile();
    getAllTweets();
  }, []);

  return (
    <div className="app">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
