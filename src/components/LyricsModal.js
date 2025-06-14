import React from "react";

const LyricsModal = ({ lyrics }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] text-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={() => window.location.reload()}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Текст пісні</h2>
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{lyrics}</pre>
      </div>
    </div>
  );
};

export default LyricsModal;
