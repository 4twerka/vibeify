import React from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const playlists = [
  { id: 1, name: "Chill Vibes", tracks: 25, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Workout Mix", tracks: 18, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Party Hits", tracks: 30, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Relax & Focus", tracks: 15, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Rock Classics", tracks: 20, image: "https://via.placeholder.com/150" },
  { id: 6, name: "Jazz Nights", tracks: 12, image: "https://via.placeholder.com/150" },
];

function PlaylistsPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Your Playlists</h2>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white transition-colors duration-300">
          <FaPlus /> <NavLink to="/addplaylist">Create Playlist</NavLink>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-white font-medium truncate">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">{playlist.tracks} tracks</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PlaylistsPage };