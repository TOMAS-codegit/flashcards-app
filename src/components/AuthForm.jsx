import React from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function AuthForm(){

    const [isSigningIn, setIsSigningIn] = React.useState(true)
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [confirmPassword, setConfirmPassword] = React.useState("");

    function toggleForm() {
        setIsSigningIn(!isSigningIn)
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (isSigningIn) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Signed in") 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            } else {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        console.log("Signed up") 
                        const user = userCredential.user;
                        console.log("User signed up successfully");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
                
            }
        }
    }

    return(
        <div>
            <h2>Sign {isSigningIn ? "In" : "Up"}</h2>
            {isSigningIn ? 
                <p>New to Flashcards App? <span onClick={toggleForm}><u>Sign up for free</u></span></p> :
                <p>Already have an account? <span onClick={toggleForm}><u>Sign In</u></span></p>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor = "email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor = "password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password" 
                        required 
                    />
                </div>
                {!isSigningIn ? 
                    <div>
                        <label htmlFor = "confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password" 
                            required />
                    </div>
                    : null
                }
                <button type="submit">{isSigningIn ? "Login" : "Sign Up"}</button>
            </form>
        </div>
    )
}
