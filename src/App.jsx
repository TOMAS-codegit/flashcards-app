import './App.css'
import Home from './pages/home/Home';
import Latest from './pages/latest/Latest';
import { Routes, Route } from 'react-router-dom'
import YourDecks from './pages/yourDecks/yourDecks';
import Flashcards from './pages/flashcards/Flashcards';

export default function App() {

  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/yourDecks" element={<YourDecks />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>

  );
}
