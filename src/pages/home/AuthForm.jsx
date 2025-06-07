import React from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom'

export default function AuthForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState(""); 
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const navigate = useNavigate(); 

    function showError(message) {
        setErrorMessage(message);
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
    }

    function clearForm() {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(false);
        setErrorMessage("");
        if (!props.isSigningIn) {
            props.setUsername("");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (props.isSigningIn) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Signed in");
                    console.log(userCredential.user);
                    if (props.onUserChange) {
                        props.onUserChange(userCredential.user);
                    }
                    navigate('/latest');
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                        showError("Invalid email or password.");
                    } else {
                        showError("Something went wrong. Try again.");
                        console.error(error.message);
                    }
                });
        } else {
            if (password !== confirmPassword) {
                showError("Passwords do not match!");
                return;
            } else if (password.length < 8) {
                showError("Password must be at least 8 characters long!");
                return;
            } else if (!/[A-Z]/.test(password)) {
                showError("Password must contain at least one uppercase letter!");
                return;
            } else if (!/[a-z]/.test(password)) {
                showError("Password must contain at least one lowercase letter!");
                return;
            } else if (!/[0-9]/.test(password)) {
                showError("Password must contain at least one numeric character!");
                return;
            }else {                
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                    
                        await setDoc(doc(db, "users", user.uid), {
                            email: user.email,
                            username: props.username,
                            createdAt: new Date()
                        });
                        console.log("User signed up and saved to Firestore.");
                        if (props.onUserChange) {
                            props.onUserChange(user);
                        }
                        props.toggleSignIn();
                        clearForm();
                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        showError("Email is already in use!");
                    } else {
                        showError("Failed to sign up. Try again.");
                        console.error(error.message);
                    }
                });              
            }
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-[#ebd2c7]/90 z-50'>
            <div className='relative bg-[#625866] p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-white'>
                <button 
                    className="absolute top-3 right-3 text-white hover:text-[#ebd2c7]" 
                    onClick={() => {
                        clearForm();
                        props.toggleForm();
            }} 
                    aria-label="Close"
                >
                    <X />
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-3xl font-bold text-center text-[#ebd2c7]">
                        Sign {props.isSigningIn ? "In" : "Up"}
                    </h2>

                    <p className="text-center text-sm">
                        {props.isSigningIn ? (
                            <>
                                New to Flashcards App?{" "}
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        clearForm();
                                        props.toggleSignIn();
                                    }}
                                    className="text-white underline hover:text-[#ebd2c7]"
                                >
                                    Sign up for free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        clearForm();
                                        props.toggleSignIn();
                                    }}
                                    className="text-white underline hover:text-[#ebd2c7]"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </p>

                    <div>
                        <label htmlFor="email" className="block text-sm mb-1">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required
                            className="w-full p-2 rounded-lg bg-[#ebd2c7] text-[#625866] placeholder:text-[#625866]"
                        />
                    </div>

                    {!props.isSigningIn &&<div>
                        <label htmlFor="username" className="block text-sm mb-1">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={props.username} 
                            onChange={(e) => props.setUsername(e.target.value)} 
                            placeholder="Enter your username" 
                            required
                            className="w-full p-2 rounded-lg bg-[#ebd2c7] text-[#625866] placeholder:text-[#625866]"></input>
                    </div>}

                    <div>
                        <label htmlFor="password" className="block text-sm mb-1">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                            required
                            className="w-full p-2 rounded-lg bg-[#ebd2c7] text-[#625866] placeholder:text-[#625866]"
                        />
                    </div>
                    {error && <p className='text-red-600 text-sm mt-0 mb-1'>{errorMessage}</p>}   
                    {!props.isSigningIn && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm mb-1">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                placeholder="Confirm your password" 
                                required
                                className="w-full p-2 rounded-lg bg-[#ebd2c7] text-[#625866] placeholder:text-[#625866]"
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full mt-2 py-2 bg-[#8d382b] hover:bg-[#a64636] text-white rounded-lg font-semibold"
                    >
                        {props.isSigningIn ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
