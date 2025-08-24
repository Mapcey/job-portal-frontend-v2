import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      const success = await login(token);
      if (success) {
        if (success === "employer") {
          navigate("/employer/profile/");
        } else if (success === "seeker") {
          navigate("/seeker/profile/");
        }
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login");
    }
  };
  // 🔹 Google Sign-in
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Google Sign-In successful:", result.user);
      navigate("/seeker/profile");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during Google Sign-In");
    }
  };
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email");
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

        {/* Error message */}
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

        {/* Success message */}
        {message && (
          <Box
            sx={{
              mb: 2,
              px: 2,
              py: 1,
              backgroundColor: "#e6ffed",
              border: "1px solid #b7eb8f",
              borderRadius: 2,
              color: "green",
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {message}
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

          {/* Forgot Password link aligned right */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              sx={{ textTransform: "none" }}
            >
              Forgot Password?
            </Link>
          </Box>

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

        <Typography variant="body2" sx={{ margin: "10px 0" }}>
          Or
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ padding: "10px 0", borderRadius: 2 }}
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>

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
      </div>
    </Container>
  );
};

export default LoginPage;
