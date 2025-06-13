import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/firebase";

function AddTrackPage() {
  const [trackData, setTrackData] = useState({
    title: "",
    artist: "",
    lyrics: "",
    image: null,
    audio: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setTrackData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setTrackData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadToUploadcare = async (file) => {
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", "dae2b75bb1bf9ed77d8a");
    formData.append("UPLOADCARE_STORE", "1");
    formData.append("file", file);

    const res = await fetch("https://upload.uploadcare.com/base/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data && data.file) {
      return `https://ucarecdn.com/${data.file}/`;
    } else {
      throw new Error("Uploadcare error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = await uploadToUploadcare(trackData.image);
      const audioUrl = await uploadToUploadcare(trackData.audio);

      const newTrack = {
        title: trackData.title,
        artist: trackData.artist,
        lyrics: trackData.lyrics,
        image: imageUrl,
        audio: audioUrl,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "tracks"), newTrack);
      alert("Track added successfully!");
    } catch (err) {
      console.error("Error adding track:", err);
      alert("Error adding track.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Track</h2>
      <form onSubmit={handleSubmit} className="bg-bgGrey p-4 rounded-lg flex flex-col gap-4">

        <div>
          <label className="block text-white mb-1">Track Image (file)</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Track Title</label>
          <input
            type="text"
            name="title"
            value={trackData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Track File (audio)</label>
          <input
            type="file"
            name="audio"
            onChange={handleChange}
            accept="audio/*"
            required
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Artist</label>
          <input
            type="text"
            name="artist"
            value={trackData.artist}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Lyrics (optional)</label>
          <textarea
            name="lyrics"
            value={trackData.lyrics}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-white"
        >
          {loading ? "Uploading..." : "Add Track"}
        </button>
      </form>
    </div>
  );
}

export { AddTrackPage };