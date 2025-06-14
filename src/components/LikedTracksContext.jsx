import React, { createContext, useContext, useState, useEffect } from "react";

const LikedTracksContext = createContext();

export function LikedTracksProvider({ children }) {
  const [likedTracks, setLikedTracks] = useState(() => {
    const saved = localStorage.getItem("likedTracks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedTracks", JSON.stringify(likedTracks));
  }, [likedTracks]);

  const toggleLike = (track) => {
    setLikedTracks((prev) => {
      const exists = prev.find((t) => t.id === track.id);
      if (exists) {
        return prev.filter((t) => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const isTrackLiked = (trackId) => {
    return likedTracks.some((track) => track.id === trackId);
  };

  return (
    <LikedTracksContext.Provider value={{ likedTracks, toggleLike, isTrackLiked }}>
      {children}
    </LikedTracksContext.Provider>
  );
}

export const useLikedTracks = () => {
  return useContext(LikedTracksContext);
};