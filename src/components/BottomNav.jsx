import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHeart, FaCompactDisc, FaUser } from 'react-icons/fa';

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bgGrey text-white flex justify-around items-center py-3 md:hidden rounded-t-2xl z-50 shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center transition-colors duration-300 cursor-pointer ${isActive ? 'text-green-400' : ''}`
        }
      >
        <FaHome size={22} />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink 
        to="/liked"
        className={({ isActive }) =>
          `flex flex-col items-center transition-colors duration-300 cursor-pointer ${isActive ? 'text-green-400' : ''}`
        }>
        <FaHeart size={22} />
        <span className="text-xs">Liked</span>
      </NavLink>

      <NavLink 
        to="/soon"
        className={({ isActive }) =>
          `flex flex-col items-center transition-colors duration-300 cursor-pointer ${isActive ? 'text-green-400' : ''}`
        }>
        <FaCompactDisc size={22} />
        <span className="text-xs">Playlists</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center transition-colors duration-300 cursor-pointer ${isActive ? 'text-green-400' : ''}`
        }
      >
        <FaUser size={22} />
        <span className="text-xs">Profile</span>
      </NavLink>
    </div>
  );
}

export { BottomNav };