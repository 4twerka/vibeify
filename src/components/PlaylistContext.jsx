import { createContext, useContext, useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const PlaylistContext = createContext();

export const usePlaylists = () => useContext(PlaylistContext);

export function PlaylistProvider({ children }) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (!user) return;
      const querySnapshot = await getDocs(collection(db, "playlists"));
      const data = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((p) => p.userId === user.uid);
      setPlaylists(data);
    };

    fetchPlaylists();
  }, [user]);

  const createPlaylist = async ({ name, description, image }) => {
    const newPlaylist = {
      name,
      description,
      image,
      userId: user.uid,
      tracks: [],
    };
    const docRef = await addDoc(collection(db, "playlists"), newPlaylist);
    setPlaylists((prev) => [...prev, { id: docRef.id, ...newPlaylist }]);
  };

  const addTrackToPlaylist = async (playlistId, track) => {
    const playlistDoc = doc(db, "playlists", playlistId);
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return;

    const updatedTracks = [...playlist.tracks, track];
    await updateDoc(playlistDoc, { tracks: updatedTracks });

    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, tracks: updatedTracks } : p))
    );
  };

  return (
    <PlaylistContext.Provider value={{ playlists, createPlaylist, addTrackToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}