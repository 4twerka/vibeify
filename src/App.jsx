import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './components/firebase';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { MusicPlayer } from './components/MusicPlayer';

import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { LikedTracksPage } from './pages/LikedTracksPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { AddTrackPage } from './pages/AddTrackPage';
import { CreatePlaylist } from './pages/CreatePlaylist';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { EditPage } from './pages/EditPage';

import { ProtectedRoute } from './components/ProtectedRoute';
import { MusicPlayerProvider } from './components/MusicPlayerContext';
import { LikedTracksProvider } from './components/LikedTracksContext';
import { PlaylistProvider } from './components/PlaylistContext';
import { AuthProvider } from './components/AuthContext';
import { ComingSoon } from './pages/ComingSoon';

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
    <AuthProvider>
      <LikedTracksProvider>
        <MusicPlayerProvider>
          <PlaylistProvider>
            <Router>
              <div className="flex bg-[#121212] min-h-screen">
                {user && (
                  <div className="hidden md:block">
                    <Sidebar />
                  </div>
                )}

                <div className="flex-1">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
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
                    <Route
                      path="/player"
                      element={
                        <ProtectedRoute>
                          <MusicPlayer />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/soon"
                      element={
                        <ProtectedRoute>
                          <ComingSoon />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>

                {user && <BottomNav />}
              </div>
              <MusicPlayer />
            </Router>
          </PlaylistProvider>
        </MusicPlayerProvider>
      </LikedTracksProvider>
    </AuthProvider>
  );
}

export default App;