import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import SeekerProfile from "./pages/Seeker/ProfilePage";
import CreateNewAcSeeker from "./pages/Seeker/CreateNewAccount";
import JobDetailsPage from "./pages/Seeker/JobDetailsPage";
import BrowseJobs from "./pages/Seeker/BrowseJobs";

import ProtectedRoute from "./routes/PrivatRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobs/details" element={<JobDetailsPage />} />
        <Route path="/jobs" element={<BrowseJobs />} />

        {/* Protected routes */}
        <Route
          path="/seeker/profile"
          element={
            <ProtectedRoute>
              <SeekerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seeker/create_account"
          element={
            <ProtectedRoute>
              <CreateNewAcSeeker />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
export default App;
