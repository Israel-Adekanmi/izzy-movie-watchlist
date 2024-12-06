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
import VerifyEmailPage from './watchlist/pages/VerifyEmail';
import HistoryPage from './watchlist/pages/HistoryPage';
import ReminderPage from './watchlist/pages/ReminderPage';
import MoodRecommendationPage from './watchlist/pages/MoodSearch';
import ReminderNotification from './watchlist/components/NotificationPopup';
import useReminderNotifications from './context/ReminderService';

function App() {
  const { showReminder, setShowReminder, reminderMessage } = useReminderNotifications();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/login" element={<GuestLogin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
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
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
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
          path="/reminders"
          element={
            <ProtectedRoute>
              <ReminderPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/mood-recommendation"
          element={
            <ProtectedRoute>
              <MoodRecommendationPage />
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
      {/* Render the notification popup if it's triggered */}
      {showReminder && (
        <ReminderNotification 
          message={reminderMessage} 
          onClose={() => setShowReminder(false)} 
        />
      )}
    </BrowserRouter>
  );
}

export default App;