import './App.css'
import Home from './pages/home/Home';
import Latest from './pages/latest/Latest';
import { Routes, Route } from 'react-router-dom'

export default function App() {

  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
      </Routes>

  );
}
