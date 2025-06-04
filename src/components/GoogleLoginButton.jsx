import React from "react";
import { FaGoogle } from "react-icons/fa";

function GoogleLoginButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300"
        >
            <FaGoogle /> Login with Google
        </button>
    );
}

export { GoogleLoginButton };
