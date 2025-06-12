import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { useRef } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const TIMEOUT_DURATION = 60 * 1000;

  const startTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      logout();
      alert("Session expired. Please log in again.");
    }, TIMEOUT_DURATION);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      startTimeout();
      // Optionally, reset timer on user activity:
      const resetOnActivity = () => startTimeout();
      window.addEventListener("mousemove", resetOnActivity);
      window.addEventListener("keydown", resetOnActivity);
      return () => {
        window.removeEventListener("mousemove", resetOnActivity);
        window.removeEventListener("keydown", resetOnActivity);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isAuthenticated]);

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};