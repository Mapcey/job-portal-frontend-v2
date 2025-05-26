import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

import Header_1 from "../components/header/Header_1";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    showPassword,
    // setShowPassword
  ] = useState(false);
  const [error, setError] = useState("");

  const handleLogintemp = async () => {
    const res = await fetch("/token.json"); // simulate your API
    const data = await res.json();
    login(data.token); // store token and set authenticated
    navigate("/seeker/profile");
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseToken = await userCredential.user.getIdToken();
      login(firebaseToken); // Store firebaseToken in context/localStorage

      // Send firebaseToken to backend
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firebaseToken}`,
        },
      });

      if (!res.ok) throw new Error("Backend auth failed");

      const data = await res.json(); // <-- You need to parse the response as JSON

      // Route based on role
      if (data.role === "seeker") {
        navigate("/seeker/profile");
      } else if (data.role === "employer") {
        navigate("/employer/profile");
      } else {
        throw new Error("Unknown user role");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const firebaseToken = await result.user.getIdToken();
      login(firebaseToken); // Save token in context/localStorage

      // Call your backend to validate the Firebase token and get user role
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firebaseToken}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.role === "seeker") {
        navigate("/seeker/profile");
      } else if (data.role === "employer") {
        navigate("/employer/profile");
      } else {
        throw new Error("Unknown role");
      }
    } catch (err) {
      console.error("Google Sign-In failed:", err);
      setError("Google Sign-In failed.");
    }
  };

  return (
    <Container>
      <Header_1 />
      <div className="login-page-content">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
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
            className="text-input-1"
            size="small"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="text-input-1"
            label="Password"
            size="small"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            // size="small"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ margin: "10px 0" }}>
          Or
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ padding: "5px 20px", borderRadius: 2 }}
          onClick={handleGoogleSignIn}
          startIcon={<GoogleIcon />}
        >
          Login in with Google
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

      {/* ************* login with dummy token (temp) ************ */}
      <h2>Login</h2>
      <button onClick={handleLogintemp}>Login (Dev)</button>
      {/* ******************************************************** */}
    </Container>
  );
};

export default LoginPage;
