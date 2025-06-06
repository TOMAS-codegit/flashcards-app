import React from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { X } from "lucide-react";

export default function AuthForm(props){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [confirmPassword, setConfirmPassword] = React.useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (props.isSigningIn) {
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
        <div className='fixed inset-0 bg-white flex flex-col items-center justify-center z-50'>
            <button onClick={props.toggleForm}><X /></button>
            <h2>Sign {props.isSigningIn ? "In" : "Up"}</h2>
            {props.isSigningIn ? 
                <p>New to Flashcards App? <span onClick={props.toggleSignIn}><u>Sign up for free</u></span></p> :
                <p>Already have an account? <span onClick={props.toggleSignIn}><u>Sign In</u></span></p>
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
                {!props.isSigningIn ? 
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
                <button type="submit">{props.isSigningIn ? "Login" : "Sign Up"}</button>
            </form>
        </div>
    )
}
