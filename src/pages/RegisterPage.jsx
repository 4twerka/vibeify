import React, { useState } from "react";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    displayName: name,
                    avatar: "",
                    bio: ""
                });
                window.location.href = "/profile";
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
            <div className="bg-darkGrey p-8 rounded-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Username</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Create a password"
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300"
                    >
                        Register
                    </button>

                    <NavLink to="/login" className="text-center">You have account?</NavLink>

                    <div className="flex items-center gap-2 text-gray-400">
                        <hr className="flex-1 border-gray-600" />
                        <span>OR</span>
                        <hr className="flex-1 border-gray-600" />
                    </div>

                    <GoogleLoginButton />
                </form>
            </div>
        </div>
    );
}

export { RegisterPage };