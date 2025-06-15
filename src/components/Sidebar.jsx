import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
    FaHome, 
    FaUser, 
    FaHeart, 
    FaCompactDisc, 
    FaPlus, 
    FaHeadphones 
} from 'react-icons/fa';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        const publicPages = ["/register", "/login"];
        const isOnPublicPage = publicPages.includes(location.pathname);

        if (user && isOnPublicPage) {
            navigate("/profile");
        }
    });

    return () => unsubscribe();
}, [navigate, location.pathname]);

    return (
        <div className="w-64 bg-bgGrey p-4 flex flex-col text-white h-screen">
            <NavLink to="/" className="text-2xl font-bold mb-8 flex items-center gap-2 cursor-pointer">
                <FaHeadphones /> Vibeify
            </NavLink>

            <ul className="flex-1">
                <NavLink 
                    to="/" 
                    className={({ isActive }) =>
                        `mb-4 flex items-center gap-3 cursor-pointer transition-colors duration-300 
                        ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
                    }
                >
                    <FaHome /> Home
                </NavLink>

                <NavLink 
                    to="/profile" 
                    className={({ isActive }) =>
                        `mb-4 flex items-center gap-3 cursor-pointer transition-colors duration-300 
                        ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
                    }
                >
                    <FaUser /> Profile
                </NavLink>

                <NavLink 
                    to="/liked" 
                    className={({ isActive }) =>
                        `mb-4 flex items-center gap-3 cursor-pointer transition-colors duration-300 
                        ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
                    }>
                    <FaHeart /> Liked tracks
                </NavLink>

                <NavLink 
                    to="/soon" 
                    className={({ isActive }) =>
                        `mb-4 flex items-center gap-3 cursor-pointer transition-colors duration-300 
                        ${isActive ? 'text-green-400' : 'hover:text-green-400'}`
                    }>
                    <FaCompactDisc /> Playlists
                </NavLink>
            </ul>

            <NavLink 
                to="/addtrack" 
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300 mt-auto text-white"
            >
                <FaPlus /> Create track
            </NavLink>
        </div>
    );
}

export { Sidebar };