import React from "react";
import { FaSearch, FaPlus } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

function Topbar() {
    return (
        <div className="flex items-center justify-between gap-4 p-4 w-full">

            <div className="flex items-center bg-bgGrey rounded-full px-4 py-2 flex-grow sm:max-w-xl w-full">
                <FaSearch className="text-gray-400 mr-2" />
                <input 
                    type="text" 
                    placeholder="Search music" 
                    className="bg-transparent outline-none text-white w-full"
                />
            </div>

            <NavLink 
                to="/addtrack" 
                className="md:hidden flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300 text-white"
            >
                <FaPlus /> 
                <span className="hidden xs:inline">Create</span> 
            </NavLink>
        </div>
    );
}

export { Topbar };