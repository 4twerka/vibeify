import React from "react";

const user = {
  name: "John Doe",
  username: "@johndoe",
  bio: "Music lover. Sharing my favorite tracks.",
  avatar: "https://via.placeholder.com/150",
};

const tracks = [
  { id: 1, title: "Track One", artist: "Artist A", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Track Two", artist: "Artist B", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Track Three", artist: "Artist C", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Track Four", artist: "Artist D", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Track Five", artist: "Artist E", image: "https://via.placeholder.com/150" },
];

function ProfilePage() {
  return (
    <div className="min-h-screen text-white p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.username}</p>
          <p className="mt-2 text-gray-300">{user.bio}</p>
        </div>
      </div>

      {/* Recommended Tracks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Tracks</h2>
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
              <h3 className="font-medium truncate">{track.title}</h3>
              <p className="text-gray-400 text-sm truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ProfilePage };