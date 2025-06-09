import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";

const tracks = [
  { id: 1, title: "Track One", artist: "Artist A", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Track Two", artist: "Artist B", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Track Three", artist: "Artist C", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Track Four", artist: "Artist D", image: "https://via.placeholder.com/150" },
  { id: 5, title: "Track Five", artist: "Artist E", image: "https://via.placeholder.com/150" },
];

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async(user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  }
  
  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div className="min-h-screen text-white p-4">
      {userDetails ? (
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
        <img
          src={userDetails.avatar}
          alt={userDetails.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
        />
        <div>
          <h1 className="text-2xl font-bold">{userDetails.name}</h1>
          <p className="text-gray-400">{userDetails.name}</p>
          <p className="mt-2 text-gray-300">No bio yet</p>
        </div>
      </div>

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
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export { ProfilePage };