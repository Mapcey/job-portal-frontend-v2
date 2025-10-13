import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import BrowseJobs from "../pages/BrowseJobs";
import NotFoundPage from "../pages/NotFoundPage";
import PricingPage from "../pages/PricingPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CreateNewAcSeeker from "../pages/Seeker/CreateNewAccount";
import SeekerProfile from "../pages/Seeker/ProfilePage";
import CreateNewAcEmployer from "../pages/Employer/CreateNewAccount";
import EmployerProfilePage from "../pages/Employer/ProfilePage";
import PostJob from "../pages/Employer/PostJob";
import ProtectedRoute from "./PrivatRoute";
import SeekerEditPage from "../pages/Seeker/EditProfile";
import EditProfileEmployer from "../pages/Employer/EditProfileEmployer";
import SeekerPublicViewPage from "../pages/Seeker/SeekerPublicViewPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { EditorProfilePage } from "../pages/Editor/EditorProfilePage";
import EditorLogin from "../pages/Editor/EditorLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/jobs" element={<BrowseJobs />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/seeker/profile/edit" element={<SeekerEditPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="/editor" element={<EditorProfilePage />} />
    <Route path="/editor_login" element={<EditorLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />

    {/* Protected routes */}
    <Route
      path="/jobs/details/:id"
      element={
        <ProtectedRoute>
          <JobDetailsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/seeker/profile"
      element={
        <ProtectedRoute allowedRoles={["seeker"]}>
          <SeekerProfile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employer/profile"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <EmployerProfilePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/employer/post"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <PostJob />
        </ProtectedRoute>
      }
    />

    <Route
      path="/employer/register"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <CreateNewAcEmployer />
        </ProtectedRoute>
      }
    />
    <Route
      path="/seeker/register"
      element={
        <ProtectedRoute allowedRoles={["seeker"]}>
          <CreateNewAcSeeker />
        </ProtectedRoute>
      }
    />

    <Route
      path="/employer/edit_profile"
      element={
        <ProtectedRoute allowedRoles={["employer"]}>
          <EditProfileEmployer />
        </ProtectedRoute>
      }
    />

    <Route
      path="/seeker_account/:seekerID"
      element={
        <ProtectedRoute allowedRoles={["employer", "seeker"]}>
          <SeekerPublicViewPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
