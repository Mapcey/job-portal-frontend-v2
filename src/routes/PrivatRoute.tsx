import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, userRole, logout } = useAuth();

  console.log("privetroute: ", isAuthenticated, userRole);

  // 1. While Firebase checks the user, show a loader
  if (loading) {
    return <Loading />;
  }

  // 2. If not authenticated, redirect to login
  if (!isAuthenticated) {
    logout();
    console.log("privetroute: log out");
    return <Navigate to="/login" replace />;
  }

  // 3. (Optional) Check role-based access
  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
