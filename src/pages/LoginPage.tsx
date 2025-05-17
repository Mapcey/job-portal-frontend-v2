import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Container, TextField, Typography } from "@mui/material";

import { GoogleLogin } from "@react-oauth/google";

import { useAuth } from "../context/AuthContext";
import Header_1 from "../components/header/Header_1";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault(); // Prevent default form submission

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      login(data.token); // Save JWT to context/localStorage
      navigate("/seeker/profile");
    } else {
      setError(data.error || "Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
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
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Typography variant="body2" sx={{ margin: "10px 0" }}>
          Or
        </Typography>

       <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        login(data.token); // Save your app's token using your AuthContext
        navigate("/seeker/profile");
      } else {
        setError(data.error || "Authentication failed.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong during Google login.");
    }
  }}
  onError={() => {
    console.log("Login Failed");
    setError("Google login failed.");
  }}
/>

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
      <button onClick={handleLogin}>Login (Dev)</button>
      {/* ******************************************************** */}
    </Container>
  );
};

export default LoginPage;
