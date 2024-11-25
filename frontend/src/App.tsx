import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchlistPage from './watchlist/pages/WatchlistPage';
import CreateWatchlist from './watchlist/pages/CreateWatchlist';
import GuestLogin from './watchlist/pages/Login';
import SignupPage from './watchlist/pages/Signup';
import EditProfile from './watchlist/pages/EditProfile';
import MovieDetailsPage from './watchlist/pages/MoviesDetails';
import EditWatchlist from './watchlist/pages/EditWatchlist';
import WatchlistDetails from './watchlist/pages/WatchlistDetails';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/login" element={<GuestLogin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/create-watchlist"
          element={
            <ProtectedRoute>
              <CreateWatchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie-details/:id"
          element={
            <ProtectedRoute>
              <MovieDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-watchlist/:id"
          element={
            <ProtectedRoute>
              <EditWatchlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watchlist-details/:id"
          element={
            <ProtectedRoute>
              <WatchlistDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;