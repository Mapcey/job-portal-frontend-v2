import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { auth } from "../config/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Token Expiry Handling - Firebase ID tokens expire after 1 hour
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const newToken = await user.getIdToken();
        setToken(newToken);
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, []);

  // Validate token before use
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    validateToken();
  }, [token]);

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
