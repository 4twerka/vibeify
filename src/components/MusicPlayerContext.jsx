import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [trackList, setTrackList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTrack = trackList[currentIndex] || null;

  const playTrack = (trackArray, index) => {
    setTrackList(trackArray);
    setCurrentIndex(index);
  };

  const setCurrentTrack = (track) => {
    const index = trackList.findIndex((t) => t.id === track.id);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setTrackList([track]);
      setCurrentIndex(0);
    }
  };

  const playNext = () => {
    if (currentIndex < trackList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        trackList,
        currentTrack,
        currentIndex,
        playTrack,
        setCurrentTrack,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);