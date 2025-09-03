import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { userLogin } from "../services/APIs/APIs";

// --- Types ---
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  firebaseUser: User | null;
  userRole: string | null;
  login: (token: string) => Promise<string>;
  logout: () => void;
  loading: boolean;
  userInfo: any;
  setUserRoleAndInfo: (role: string, info: any) => void;
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

  const setUserRoleAndInfo = (role: string, info: any) => {
    setUserRole(role);
    setUserInfo(info);
    setIsAuthenticated(true);
  };

  const login = async (token: string): Promise<string> => {
    setToken(token);
    try {
      const response = await userLogin(); // backend API
      if (response) {
        const role = response.role;
        const userData =
          role === "seeker" ? response.seeker : response.employer;

        setUserRole(role);
        console.log("role set :", role);

        setUserInfo(userData);
        console.log("info set: ", userData);
        setIsAuthenticated(true);

        return role;
      }
    } catch (error) {
      console.error("Login failed:", error);
      logout();
      return "null";
    }

    setLoading(false);

    return "null";
  };

  const logout = () => {
    setToken(null);
    setFirebaseUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    signOut(auth);
    console.log("logout function - OK");
  };

  // Persist session and fetch backend user info on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("presist");

      if (user) {
        const token = await user.getIdToken();
        setFirebaseUser(user);
        setToken(token);
        setIsAuthenticated(true);

        const isNewUser =
          user.metadata.creationTime === user.metadata.lastSignInTime;
        if (isNewUser) {
          console.log("New user just signed up — skip userLogin");
          setLoading(false); // Still update UI state
          return;
        }

        try {
          const response = await userLogin(); // backend API
          if (response) {
            const role = response.role;
            const userData =
              role === "seeker" ? response.seeker : response.employer;
            setUserRole(role);
            setUserInfo(userData);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.error("Failed to fetch user info on auth state change:", err);
          logout();
        }
      } else {
        logout();
      }
      console.log("loading finish");
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
        setUserRoleAndInfo,
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
