import React from "react";
import { useLikedTracks } from "../components/LikedTracksContext";
import { useMusicPlayer } from "../components/MusicPlayerContext";
import { FaPlay } from "react-icons/fa";

function LikedTracksPage() {
  const { likedTracks } = useLikedTracks();
  const { playTrack } = useMusicPlayer();

  if (likedTracks.length === 0) {
    return <p className="text-white p-4">No liked tracks yet.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Liked Tracks</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {likedTracks.map((track, index) => (
          <div
            key={track.id}
            className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer group relative"
            onClick={() => playTrack(likedTracks, index)}
          >
            <div className="relative">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <FaPlay className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-white font-medium truncate">{track.title}</h3>
            <p className="text-gray-400 text-sm truncate">{track.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { LikedTracksPage };