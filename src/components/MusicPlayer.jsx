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

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#1f1f1f] border-t border-gray-700 p-4 flex items-center justify-between gap-4 z-40 flex-wrap md:mb-0 mb-14">
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

      <div className="flex items-center">
        <button
          onClick={toggleLike}
          className="text-white hover:text-red-500 transition text-xl"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <audio ref={audioRef} src={currentTrack.audio} />
    </div>
  );
}

export { MusicPlayer };