import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function GoogleLoginButton() {
    async function googleLogin() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, "Users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    displayName: user.displayName || "",
                    avatar: user.photoURL || "",
                    bio: ""
                });
            }

            window.location.href = "/profile";
        } catch (error) {
            console.error("Google login error:", error);
        }
    }

    return (
        <button
            onClick={googleLogin}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300"
        >
            <FaGoogle /> Login with Google
        </button>
    );
}

export { GoogleLoginButton };