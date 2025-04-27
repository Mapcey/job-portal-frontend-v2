import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import SeekerProfile from "./pages/Seeker/ProfilePage";
import CreateNewAcSeeker from "./pages/Seeker/CreateNewAccount";
import JobDetailsPage from "./pages/Seeker/JobDetailsPage";
import BrowseJobs from "./pages/Seeker/BrowseJobs";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./routes/PrivatRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/jobs/details" element={<JobDetailsPage />} />
        <Route path="/jobs" element={<BrowseJobs />} />
        <Route path="/seeker/create_account" element={<CreateNewAcSeeker />} />

        {/* Protected routes */}
        <Route
          path="/seeker/profile"
          element={
            <ProtectedRoute>
              <SeekerProfile />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
