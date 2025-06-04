import React from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { MainPage } from './pages/MainPage';
import { BottomNav } from './components/Bottomnav';
import { ProfilePage } from './pages/ProfilePage';
import { LikedTracksPage } from './pages/LikedTracksPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { AddTrackPage } from './pages/AddTrackPage';
import { CreatePlaylist } from './pages/CreatePlaylist';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <div className="flex bg-[#121212] min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/liked" element={<LikedTracksPage />} />
            <Route path='/playlists' element={<PlaylistsPage />} />
            <Route path='/addtrack' element={<AddTrackPage />} />
            <Route path='/addplaylist' element={<CreatePlaylist />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;