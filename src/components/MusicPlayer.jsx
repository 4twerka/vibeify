import React, { useRef, useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaHeart,
  FaRegHeart,
  FaVolumeUp,
  FaVolumeMute,
  FaMicrophoneAlt,
} from "react-icons/fa";
import { useMusicPlayer } from "./MusicPlayerContext";

function MusicPlayer() {
  const { currentTrack, playNext, playPrevious } = useMusicPlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (currentTrack) {
      setIsPlaying(true);
      setTimeout(() => {
        if (audioRef.current) {
          if (isMobile) {
            audioRef.current.volume = 1; // max volume for mobile
          }
          audioRef.current.play();
        }
      }, 100);
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
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(1, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#1f1f1f] border-t border-gray-700 p-4 flex flex-col gap-3 z-40 md:mb-0 mb-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <img
            src={currentTrack.image}
            alt={currentTrack.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="overflow-hidden">
            <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mx-auto">
          <button
            onClick={playPrevious}
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
            onClick={playNext}
            className="text-white hover:text-green-500 transition text-xl"
          >
            <FaStepForward />
          </button>
        </div>

        <div className="flex items-center gap-3 relative">
          {!isMobile && (
            <>
              <button
                onClick={() => setShowVolume(!showVolume)}
                className="text-white hover:text-green-500 transition text-xl"
                title="Гучність"
              >
                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

              {showVolume && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute -top-10 w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              )}
            </>
          )}

          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className="text-white hover:text-purple-400 transition text-xl"
            title="Показати текст пісні"
          >
            <FaMicrophoneAlt />
          </button>

          <button
            onClick={toggleLike}
            className="text-white hover:text-red-500 transition text-xl"
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="w-full flex items-center gap-2">
        <span className="text-xs text-gray-400 w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-400 w-10 text-left">
          {formatTime(duration)}
        </span>
      </div>

      {showLyrics && currentTrack.lyrics && (
        <div className="mt-2 max-h-40 overflow-y-auto p-3 bg-gray-800 rounded-md text-sm text-gray-200 leading-relaxed">
          <pre className="whitespace-pre-wrap">{currentTrack.lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export { MusicPlayer };