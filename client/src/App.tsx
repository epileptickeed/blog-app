import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
