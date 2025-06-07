import './App.css'
import Home from './pages/home/Home';
import Latest from './pages/latest/Latest';
import { Routes, Route } from 'react-router-dom'
import YourDecks from './pages/yourDecks/yourDecks';
import Flashcards from './pages/flashcards/Flashcards';
import React from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';

export default function App() {

  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const simpleUser = {
          uid: user.uid,
          email: user.email
        };
        setCurrentUser(simpleUser);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (

      <Routes>
        <Route path="/" element={<Home 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
        />} />
        <Route path="/latest" element={<Latest 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
        />} />
        <Route path="/yourDecks" element={<YourDecks 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
        />} />
        <Route path="/flashcards" element={<Flashcards 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser}
        />} />
      </Routes>

  );
}
