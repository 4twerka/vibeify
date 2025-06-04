import React, { useState } from "react";

function AddTrackPage() {
  const [trackData, setTrackData] = useState({
    image: "",
    title: "",
    audio: "",
    artist: "",
    lyrics: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrackData({ ...trackData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Track added:", trackData);
    alert("Track added successfully! (console log)");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Track</h2>
      <form 
        onSubmit={handleSubmit} 
        className="bg-bgGrey p-4 rounded-lg flex flex-col gap-4"
      >

        <div>
          <label className="block text-white mb-1">Track Image URL</label>
          <input
            type="text"
            name="image"
            value={trackData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Track Title</label>
          <input
            type="text"
            name="title"
            value={trackData.title}
            onChange={handleChange}
            placeholder="Enter track title"
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Track File (URL or file name)</label>
          <input
            type="text"
            name="audio"
            value={trackData.audio}
            onChange={handleChange}
            placeholder="Enter audio file URL or name"
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Artist</label>
          <input
            type="text"
            name="artist"
            value={trackData.artist}
            onChange={handleChange}
            placeholder="Enter artist name"
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-white mb-1">Lyrics (optional)</label>
          <textarea
            name="lyrics"
            value={trackData.lyrics}
            onChange={handleChange}
            placeholder="Enter lyrics (optional)"
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-white transition-colors duration-300"
        >
          Add Track
        </button>
      </form>
    </div>
  );
}

export { AddTrackPage };