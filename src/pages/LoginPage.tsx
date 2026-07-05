import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const firebaseErrorMessage = (err: any) => {
    const code = err?.code || "";
    switch (code) {
      case "auth/invalid-credential":
        return "Invalid authentication credential. Please try signing in again.";
      case "auth/user-not-found":
        return "No account found for this email. Please sign up first.";
      case "auth/wrong-password":
        return "Incorrect password. Use 'Forgot password' to reset it.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait and try again later.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing. Please try again.";
      case "auth/popup-blocked":
        return "Sign-in popup was blocked by your browser. Allow popups and try again.";
      case "auth/cancelled-popup-request":
        return "Sign-in was cancelled. Please try again.";
      default:
        return err?.message || "An unexpected authentication error occurred.";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log(token);

      const success = await login(token); // Wait for backend validation

      console.log("login function - OK");

      if (success) {
        console.log(success);
        if (success == "employer") {
          navigate("/employer/profile/");
        } else if (success == "seeker") {
          navigate("/seeker/profile/");
          console.log(token);
        }
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err: any) {
      setError(firebaseErrorMessage(err));
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In successful:", result.user);

      // After Firebase sign-in, obtain token and call backend login to set app state
      const token = await result.user.getIdToken();
      try {
        const role = await login(token);
        if (role === "employer") navigate("/employer/profile");
        else navigate("/seeker/profile");
      } catch (innerErr: any) {
        console.error("Backend login failed after Google sign-in:", innerErr);
        setError(innerErr?.message || "Signed in with Google but failed to complete app login.");
      }
    } catch (err: any) {
      console.error("Error during Google Sign-In:", err);
      setError(firebaseErrorMessage(err));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Header_1 />
      <div className="login-page-content">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              px: 2,
              py: 1,
              backgroundColor: "#fdecea",
              border: "1px solid #f5c6cb",
              borderRadius: 2,
              color: "error.main",
            }}
          >
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight={500}>
              {error}
            </Typography>
          </Box>
        )}
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px 0", borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
  
        </Typography>
                  <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/editor_login")}
          >
            Editor Login
          </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
