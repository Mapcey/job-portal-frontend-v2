import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SeekerProfile from "./pages/Seeker/Profile";
import CreateNewAcSeeker from "./pages/Seeker/CreateNewAccount";

import ProtectedRoute from "./routes/PrivatRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

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
          path="/seeker/create-account"
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
