import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { usePlaylists } from "../components/PlaylistContext";
import PlaylistModal from "../components/PlaylistModal";

function PlaylistsPage() {
  const { playlists } = usePlaylists();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const closeModal = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Your Playlists</h2>
        <NavLink to="/addplaylist">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl text-white transition-colors duration-300">
            <FaPlus /> Create Playlist
          </button>
        </NavLink>
      </div>
      {playlists.length === 0 ? (
        <p className="text-gray-400">You have no playlists yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => handlePlaylistClick(playlist)} // відкриває модалку
              className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={playlist.image}
                alt={playlist.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-white font-medium truncate">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">{playlist.tracks?.length || 0} tracks</p>
            </div>
          ))}
        </div>
      )}

      {selectedPlaylist && (
        <PlaylistModal playlist={selectedPlaylist} onClose={closeModal} />
      )}
    </div>
  );
}

export { PlaylistsPage };