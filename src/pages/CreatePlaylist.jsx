import React, { useState } from "react";
import { usePlaylists } from "../components/PlaylistContext";
import { useNavigate } from "react-router-dom";

function CreatePlaylist() {
  const { createPlaylist } = usePlaylists();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image!");

    // Конвертація в base64 (можна замінити на upload to Firebase Storage)
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await createPlaylist({ name, description, image: base64Image });
      navigate("/playlists");
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgGrey text-white p-4">
      <div className="bg-darkGrey p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Playlist</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            className="text-white"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <input
            type="text"
            placeholder="Enter playlist name"
            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Add a short description"
            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
}

export { CreatePlaylist };