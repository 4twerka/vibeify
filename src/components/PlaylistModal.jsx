import React, { useState } from "react";
import { doc } from "firebase/firestore";
import { usePlaylists } from "../components/PlaylistContext";
import { FaTrash, FaCog, FaTimes, FaPlus } from "react-icons/fa";

function PlaylistModal({ playlist, onClose }) {
  const { updatePlaylist, deletePlaylist, addTrackToPlaylist } = usePlaylists();
  const [editMode, setEditMode] = useState(false);
  const [newData, setNewData] = useState({
    name: playlist.name,
    description: playlist.description,
    image: playlist.image,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleUpdate = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePlaylist(playlist.id, {
          ...newData,
          image: reader.result
        });
        setEditMode(false);
      };
      reader.readAsDataURL(imageFile);
    } else {
      updatePlaylist(playlist.id, newData);
      setEditMode(false);
    }
  };

  const handleDelete = () => {
    deletePlaylist(playlist.id);
    onClose();
  };

  const handleAdd = (track) => {
    if (!(playlist.tracks || []).some(t => t.id === track.id)) {
      addTrackToPlaylist(playlist.id, track);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center p-4">
      <div className="bg-bgGrey rounded-2xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh] relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500">
          <FaTimes size={20}/>
        </button>

        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <img src={newData.image} alt="" className="w-full md:w-60 h-60 object-cover rounded-xl"/>
          <div className="flex-1 text-white">
            {editMode ? (
              <>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}/>
                <input value={newData.name} onChange={e => setNewData({...newData, name: e.target.value})} className="bg-gray-700"/>
                <textarea value={newData.description} onChange={e => setNewData({...newData, description: e.target.value})} className="bg-gray-700"/>
                <button onClick={handleUpdate} className="bg-green-600">Save</button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{newData.name}</h2>
                <p className="text-gray-400">{newData.description}</p>
              </>
            )}
            <button onClick={() => setEditMode(!editMode)} className="bg-gray-700"><FaCog/> Edit</button>
            <button onClick={handleDelete} className="bg-red-600"><FaTrash/> Delete</button>
          </div>
        </div>

        <h3 className="text-xl text-white mb-2">Tracks in Playlist ({playlist.tracks?.length || 0})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {playlist.tracks?.map(track => (
            <div key={track.id} className="bg-gray-700 rounded-lg p-2 text-white text-sm">
              <img src={track.image} className="w-full h-20 object-cover rounded mb-1"/>
              <div className="truncate">{track.title}</div>
              <div className="truncate text-gray-400 text-xs">{track.artist}</div>
            </div>
          ))}
        </div>

        <h3 className="text-xl text-white mb-2">Add Tracks</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {playlist.contextTracks.map(track => (
            <div key={track.id} className="bg-gray-800 rounded-lg p-2 text-white text-xs">
              <img src={track.image} className="w-full h-20 object-cover rounded mb-1"/>
              <div className="truncate">{track.title}</div>
              <div className="truncate text-gray-400 text-[10px]">{track.artist}</div>
              <button onClick={() => handleAdd(track)} className="bg-green-600 px-2 py-1 rounded text-[11px]"><FaPlus/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistModal;