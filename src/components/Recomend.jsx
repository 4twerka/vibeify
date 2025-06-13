import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useMusicPlayer } from "./MusicPlayerContext";

function Recomend() {
  const [tracks, setTracks] = useState([]);
  const { setCurrentTrack } = useMusicPlayer();

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
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => setCurrentTrack(track)}
            className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={track.image}
              alt={track.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-white font-medium truncate">{track.title}</h3>
            <p className="text-gray-400 text-sm truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Recomend };