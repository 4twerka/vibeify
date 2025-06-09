import React, { useState } from "react";
import { GoogleLoginButton } from "../components/GoogleLoginButton";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href="/profile";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
            <div className="bg-darkGrey p-8 rounded-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        <label className="block mb-2 font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300"
                    >
                        Login
                    </button>

                    <NavLink to="/register" className="text-center">You don't have account?</NavLink>

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

export { LoginPage };