import AuthForm from './AuthForm';
import Header from './Header';
import GetStarted from './GetStarted';
import Footer from './Footer';
import React from 'react';

export default function Home() {
    
  const [showForm, setShowForm] = React.useState(false)
  const [isSigningIn, setIsSigningIn] = React.useState(true)
  const [username, setUsername] = React.useState("");
    
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
      
      {showForm ? <AuthForm
        toggleForm={toggleForm}
        isSigningIn={isSigningIn}
        toggleSignIn={toggleSignIn}
        username={username}
        setUsername={setUsername}
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