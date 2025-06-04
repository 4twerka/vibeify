import React from "react";

function CreatePlaylist() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgGrey text-white p-4">
            <div className="bg-darkGrey p-8 rounded-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Playlist</h1>
                <form className="flex flex-col gap-4">
                    {/* Upload Playlist Cover */}
                    <div>
                        <label className="block mb-2 font-medium">Playlist Cover</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>
                    
                    {/* Playlist Name */}
                    <div>
                        <label className="block mb-2 font-medium">Playlist Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter playlist name" 
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white"
                        />
                    </div>

                    {/* Playlist Description (optional) */}
                    <div>
                        <label className="block mb-2 font-medium">Description (optional)</label>
                        <textarea 
                            placeholder="Add a short description" 
                            className="w-full bg-bgGrey border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        Create Playlist
                    </button>
                </form>
            </div>
        </div>
    );
}

export { CreatePlaylist };