import './App.css'
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import React from 'react';

export default function App() {

  const [showForm, setShowForm] = React.useState(false);
  const [isSigningIn, setIsSigningIn] = React.useState(true)

  function toggleForm() {
    setShowForm(!showForm);
  }

  function toggleSignIn() {
    setIsSigningIn(!isSigningIn);
  }

  function showSignUp() {
    setIsSigningIn(false);
  }

  function showSignIn() {
    setIsSigningIn(true);
  }

  return (
    <div className="min-h-screen bg-[#ebd2c7] flex flex-col relative">
      
      {showForm ? <AuthForm toggleForm={toggleForm}
        isSigningIn={isSigningIn}
        toggleSignIn={toggleSignIn}
      /> : null}

      {!showForm && <Header 
        toggleForm={toggleForm}
        showSignIn={showSignIn}
      />}

      {!showForm && <GetStarted 
        toggleForm={toggleForm}
        showSignUp={showSignUp}
      />}

      {!showForm && <Footer />}
      
    </div>
  );
}
