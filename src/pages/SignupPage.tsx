import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import { GoogleLogin } from "@react-oauth/google";

import Header_1 from "../components/header/Header_1";

const SignupPage = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = tab === 0 ? "seeker" : "employer";

    console.log({ email, password, confirmPassword, role });

    // TODO: Send signup request to backend with role
  };

  return (
    <Container>
      <Header_1 />
      <div className="signup-page-content">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Job Seeker" sx={{ color: "text.primary" }} />
          <Tab label="Employer" sx={{ color: "text.primary" }} />
        </Tabs>

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSignup}
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
            className="text-input-1"
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
          <TextField
            className="text-input-1"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Optional: Role-specific fields */}
          {/* {tab === 1 && (
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              required
            />
          )} */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            Sign Up as {tab === 0 ? "Job Seeker" : "Employer"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ my: 2, textAlign: "center" }}>
          Or
        </Typography>

        {/* <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ py: 1.5, borderRadius: 2 }}
        >
          Sign up with Google
        </Button> */}

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google credential", credentialResponse);
            // You can send credentialResponse.credential to your backend for verification
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />

        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          Already have an account?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Typography>
      </div>
    </Container>
  );
};

export default SignupPage;
