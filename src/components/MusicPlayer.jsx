import React, { useRef, useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useMusicPlayer } from "./MusicPlayerContext";

function MusicPlayer() {
  const { currentTrack } = useMusicPlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    if (currentTrack && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  if (!currentTrack) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#1f1f1f] border-t border-gray-700 p-4 pt-2 flex flex-col gap-2 z-40 md:mb-0 mb-14">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div className="overflow-hidden">
              <h3 className="text-white font-medium truncate">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mx-auto">
            <button
              onClick={() => console.log("Попередній трек")}
              className="text-white hover:text-green-500 transition text-xl"
            >
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              className="text-white hover:text-green-500 transition text-2xl"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={() => console.log("Наступний трек")}
              className="text-white hover:text-green-500 transition text-xl"
            >
              <FaStepForward />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLike}
              className="text-white hover:text-red-500 transition text-xl"
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              onClick={toggleLyrics}
              className="text-white hover:text-yellow-400 transition text-sm border border-gray-600 px-3 py-1 rounded"
            >
              Lyrics
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 appearance-none h-1 bg-gray-500 rounded-lg cursor-pointer"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <audio
          ref={audioRef}
          src={currentTrack.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>

      {showLyrics && (
        <div className="fixed bottom-28 left-0 right-0 md:left-64 bg-[#1f1f1f] text-white px-6 py-4 z-40 border-t border-gray-700 max-h-60 overflow-y-auto">
          <h4 className="text-lg font-semibold mb-2">Lyrics</h4>
          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
            {currentTrack.lyrics || "Oopss... no lyrics for this track 😔"}
          </p>
        </div>
      )}
    </>
  );
}

export { MusicPlayer };
