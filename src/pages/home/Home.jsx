import AuthForm from './AuthForm';
import GetStarted from './GetStarted';
import Footer from './Footer';
import React from 'react';
import NavHeader from '../../components/NavHeader';

export default function Home(props) {
    
  const [showForm, setShowForm] = React.useState(false)
  const [isSigningIn, setIsSigningIn] = React.useState(true)
  const [username, setUsername] = React.useState("");
  

  React.useEffect(() => {
    console.log("Home.jsx currentUser changed:", props.currentUser);
  }, [props.currentUser]);
    
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
        onUserChange={props.setCurrentUser}
      /> : null}

      {!showForm && <NavHeader 
        currentUser={props.currentUser} 
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
