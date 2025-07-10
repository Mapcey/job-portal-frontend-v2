import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";

// --- Types ---
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEV_MODE_BYPASS_AUTH = true; // ! validation by pass

// --- Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Called when user logs in
  const login = async (newToken: string): Promise<boolean> => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    // ! validation by pass
    if (DEV_MODE_BYPASS_AUTH) {
      setIsAuthenticated(true);
      return true;
    }

    const result = await validateToken(newToken);
    return result;
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    signOut(auth);
    setUser(null);
  };

  // Validate token with backend securely
  const validateToken = async (incomingToken: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://qvf.93e.mytemp.website/api2/api/auth/validate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${incomingToken}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        console.log(data);

        // setUser(data); // if backend returns user info
        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error("Token validation failed:", err);
      logout();
      return false;
    } finally {
      setLoading(false);
    }
  };

  // On first load: check localStorage token, but validate before trusting
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      validateToken(storedToken); // ✅ this handles refresh
    } else {
      setLoading(false);
    }
  }, []);

  // Firebase listener (optional)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
