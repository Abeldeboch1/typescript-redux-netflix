import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './pages/LogIn';
import MoviePage from './pages/Movies';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import SignUp from './pages/SignUp';
import TVShows from './pages/TVShows';
import UserListedMovies from './pages/UserListedMovies';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/player" element={<Player />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/new" element={<Player />} />
        <Route path="/mylist" element={<UserListedMovies />} />
        <Route path="/" element={<Netflix />} />
      </Routes>
    </BrowserRouter>
  );
}
