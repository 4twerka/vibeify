import React from "react";

const likedTracks = [
  { id: 1, title: "Favorite One", artist: "Artist X", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Favorite Two", artist: "Artist Y", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Favorite Three", artist: "Artist Z", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Favorite Four", artist: "Artist W", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Favorite Five", artist: "Artist V", image: "https://via.placeholder.com/150" },
  { id: 6, title: "Favorite Six", artist: "Artist U", image: "https://via.placeholder.com/150" },
];

function LikedTracksPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Liked Tracks</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {likedTracks.map((track) => (
          <div
            key={track.id}
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

export { LikedTracksPage };