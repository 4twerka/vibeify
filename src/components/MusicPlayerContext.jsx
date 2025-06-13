import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <MusicPlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};