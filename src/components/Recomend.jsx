import React from "react";

const tracks = [
  { id: 1, title: "Track One", artist: "Artist A", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Track Two", artist: "Artist B", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Track Three", artist: "Artist C", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Track Four", artist: "Artist D", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Track Five", artist: "Artist E", image: "https://via.placeholder.com/150" },
];

function Recomend() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Recommended for You</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {tracks.map((track) => (
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

export { Recomend };