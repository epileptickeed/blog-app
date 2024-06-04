import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = `http://localhost:8080`;
  axios.defaults.withCredentials = true;

  return (
    <div className="app">
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
