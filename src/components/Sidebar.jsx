import React from "react";
import { NavLink } from "react-router-dom";
import { 
    FaHome, 
    FaUser, 
    FaHeart, 
    FaCompactDisc, 
    FaPlus, 
    FaHeadphones 
} from 'react-icons/fa';

function Sidebar() {
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
                    to="/register" 
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
                    to="/playlists" 
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