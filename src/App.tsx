import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import JobDetailsPage from "./pages/Seeker/JobDetailsPage";
import BrowseJobs from "./pages/Seeker/BrowseJobs";
import NotFoundPage from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";

import CreateNewAcSeeker from "./pages/Seeker/CreateNewAccount";
import SeekerProfile from "./pages/Seeker/ProfilePage";

import CreateNewAcEmployer from "./pages/Employer/CreateNewAccount";
import EmployerProfilePage from "./pages/Employer/ProfilePage";
import PostJob from "./pages/Employer/PostJob";

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
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />

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
          path="/employer/profile"
          element={
            <ProtectedRoute>
              <EmployerProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/post"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/create_account"
          element={
            <ProtectedRoute>
              <CreateNewAcEmployer />
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
