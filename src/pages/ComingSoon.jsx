import React from "react";

function ComingSoon() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient bg-[length:400%_400%] z-0" />

      <div className="z-10 text-center p-6">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide animate-pulse drop-shadow-lg">
          Coming Soon
        </h1>
        <p className="text-gray-300 mt-4 text-sm md:text-lg animate-fade-in-slow">
          We're working on something amazing...
        </p>
      </div>

      <div className="absolute w-80 h-80 bg-purple-700 rounded-full opacity-20 blur-3xl top-[-100px] left-[-100px] animate-float" />
      <div className="absolute w-80 h-80 bg-pink-600 rounded-full opacity-20 blur-3xl bottom-[-100px] right-[-100px] animate-float-delay" />
    </div>
  );
}

export { ComingSoon };