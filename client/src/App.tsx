import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import Messages from './pages/Messages/Messages';

function App() {
  axios.defaults.baseURL = `http://localhost:8080`;
  axios.defaults.withCredentials = true;

  const { data: tweetsData } = useQuery('tweets', getAllTweets);

  async function getAllTweets() {
    try {
      const { data } = await axios.get('/getAllTweets');
      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          success: { style: { background: '#272727', color: 'white' } },
          error: { style: { background: '#272727', color: 'white' } },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
