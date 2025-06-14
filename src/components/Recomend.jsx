import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useMusicPlayer } from "./MusicPlayerContext";
import { FaPlay } from "react-icons/fa";

function Recomend() {
  const [tracks, setTracks] = useState([]);
  const { playTrack } = useMusicPlayer();

  useEffect(() => {
    const fetchTracks = async () => {
      const querySnapshot = await getDocs(collection(db, "tracks"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTracks(data);
    };

    fetchTracks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Recommended for You</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer group relative"
          >
            <div className="relative">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playTrack(tracks, index);
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
              >
                <FaPlay className="text-white text-xl" />
              </button>
            </div>
            <h3 className="text-white font-medium truncate">{track.title}</h3>
            <p className="text-gray-400 text-sm truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Recomend };