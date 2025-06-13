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
import { EditPage } from './pages/EditPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './components/firebase';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="flex bg-[#121212] min-h-screen">
        {/* Sidebar тільки якщо залогінений */}
        {user && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}

        <div className="flex-1">
          <Routes>
            {/* Публічні сторінки */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Захищені сторінки */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/liked"
              element={
                <ProtectedRoute>
                  <LikedTracksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/playlists"
              element={
                <ProtectedRoute>
                  <PlaylistsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addtrack"
              element={
                <ProtectedRoute>
                  <AddTrackPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addplaylist"
              element={
                <ProtectedRoute>
                  <CreatePlaylist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <ProtectedRoute>
                  <EditPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* BottomNav тільки якщо залогінений */}
        {user && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;