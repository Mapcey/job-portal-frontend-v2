import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserInfo } from "../services/APIs/APIs";

// --- Types ---
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  firebaseUser: User | null;
  userRole: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  userInfo: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

// --- Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  const login = async (token: string): Promise<boolean> => {
    setToken(token);
    try {
      const userData = await getUserInfo(); // Token sent via axios interceptor
      setIsAuthenticated(true);
      if (userData.role) setUserRole(userData.role);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      logout();
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setFirebaseUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    signOut(auth);
  };

  // Persist session and fetch backend user info on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setFirebaseUser(user);
        setToken(token);

        try {
          const userData = await getUserInfo();
          setUserRole(userData.role);
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Failed to fetch user info on auth state change:", err);
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        firebaseUser,
        userRole,
        login,
        logout,
        loading,
        userInfo,
      }}
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
