import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const DEV_MODE_BYPASS_AUTH = true; //! dev bypass

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  //! dev bypass
  if (DEV_MODE_BYPASS_AUTH) {
    if (loading) {
      return <Loading />; // or your custom loading spinner
    }
    return <>{children}</>;
  }

  if (loading) {
    return <Loading />; // or your custom loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
