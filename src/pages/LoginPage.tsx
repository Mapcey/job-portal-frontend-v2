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
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  // ...state...
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      login(token); // store token in context
      navigate("/seeker/profile"); // navigate after login
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In successful:", user);
       navigate("/seeker/profile");
    } catch (err: any) {
      console.error("Error during Google Sign-In:", err);
      setError(err.message || "An unexpected error occurred during Google Sign-In");
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
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
