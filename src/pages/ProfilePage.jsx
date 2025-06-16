import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSettings, FiLogOut, FiTrash2 } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { useMusicPlayer } from "../components/MusicPlayerContext";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [userTracks, setUserTracks] = useState([]);
  const { setCurrentTrack, playTrack, stopTrack } = useMusicPlayer();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      const data = docSnap.exists() ? docSnap.data() : {};
      setUserDetails({
        displayName: data.displayName || data.name || user.displayName || "No Name",
        email: data.email || user.email || "No Email",
        photo: data.avatar || data.photo || user.photoURL || "/defaultPhoto.jpg",
        bio: data.bio || "",
        uid: user.uid,
      });

      const q = query(collection(db, "tracks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userTracksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTracks(userTracksData);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, [location.pathname]);

  const handleLogout = async () => {
    stopTrack();
    await signOut(auth);
    navigate("/login");
  };

  const handleChangeProfile = () => {
    navigate("/edit");
  };

  const handleDeleteTrack = async (trackId) => {
    const confirmDelete = window.confirm("Ви впевнені, що хочете видалити цей трек?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "tracks", trackId));
      setUserTracks((prev) => prev.filter((track) => track.id !== trackId));
    } catch (err) {
      console.error("Error deleting track:", err);
      alert("Помилка при видаленні треку.");
    }
  };

  return (
    <div className="min-h-screen text-white p-4 relative">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {!isGoogleUser && (
          <button
            onClick={handleChangeProfile}
            className="text-gray-400 hover:text-white transition-colors"
            title="Редагувати профіль"
          >
            <FiSettings size={24} />
          </button>
        )}
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Вийти"
        >
          <FiLogOut size={24} />
        </button>
      </div>

      {userDetails ? (
        <div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <img
              src={userDetails.photo}
              alt={userDetails.displayName}
              className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
            />
            <div>
              <h1 className="text-2xl font-bold">{userDetails.displayName}</h1>
              <p className="text-gray-400">{userDetails.email}</p>
              <p className="mt-2 text-gray-300">
                {userDetails.bio ? userDetails.bio : "No bio yet"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Tracks</h2>
            {userTracks.length === 0 ? (
              <p className="text-gray-400">You don't have any tracks yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {userTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="bg-bgGrey rounded-lg p-3 hover:bg-green-600 hover:scale-105 transition-all duration-300 relative group"
                  >
                    <button
                      onClick={() => handleDeleteTrack(track.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
                      title="Видалити трек"
                    >
                      <FiTrash2 size={18} />
                    </button>

                    <div className="relative">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <button
                        onClick={() => playTrack(userTracks, index)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                        title="Play"
                      >
                        <FaPlay className="text-white text-xl" />
                      </button>
                    </div>

                    <h3 className="font-medium truncate">{track.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}

export { ProfilePage };