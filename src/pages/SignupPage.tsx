import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
} from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase/config";

import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";

import { signupSeeker } from "../services/APIs/APIs";
import { signupEmployer } from "../services/APIs/APIs";

const SignupPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const { setUserRoleAndInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Failed to set Firebase persistence:", error);
    });
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSignup = async (e: React.FormEvent) => {
    setSubmitting(true);
    setError("");
    await setPersistence(auth, browserLocalPersistence);
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();
      const uid = user.uid;
      const firebaseEmail = user.email;

      if (!firebaseEmail) {
        throw new Error("Email not found in Firebase user object.");
      }

      const userPayload = {
        ContactNo: "12345",
        Email: firebaseEmail,
      };

      if (selectedTab === 0) {
        const response = await signupSeeker(userPayload);
        console.log(response);
        if (response) {
          console.log("Signup success");
          setUserRoleAndInfo("seeker", response);
          navigate("/seeker/register");
        }
      } else {
        const response = await signupEmployer(userPayload);
        console.log(response);
        if (response.FirebaseUID == uid) {
          console.log("Signup success");
          setUserRoleAndInfo("employer", response);
          navigate("/employer/register");
        } else {
          throw new Error(response.message || "Signup failed");
        }
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user).catch((deleteErr) =>
          console.warn("Failed to delete Firebase user:", deleteErr)
        );
      }
      setError(err.message || "An unexpected error occurred during signup");
    } finally {
      setSubmitting(false);
    }
  };

  // const handleGoogleSignUp = async () => {
  //   await setPersistence(auth, browserLocalPersistence);
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     const token = await user.getIdToken();
  //     const uid = user.uid;
  //     const firebaseEmail = user.email;

  //     if (!firebaseEmail) {
  //       throw new Error("Email not found in Firebase user object.");
  //     }

  //     const userPayload = {
  //       IsSub: false,
  //     };

  //     login(token);

  //     if (selectedTab === 0) {
  //       await signupSeeker(userPayload);
  //       navigate("/seeker/register");
  //       console.log("seeker api - gmail", userPayload);
  //     } else {
  //       console.log("employer");

  //       const response = await signupEmployer(userPayload);
  //       console.log(response);

  //       if (response.success) {
  //         console.log("Signup confirmed:", response.data);
  //         navigate("/seeker/register");
  //       } else {
  //         throw new Error(response.message || "Signup failed");
  //       }
  //     }
  //   } catch (err: any) {
  //     setError(
  //       err.message || "An unexpected error occurred during Google Sign-Up"
  //     );
  //   }
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container>
      <Header_1 />
      <div className="signup-page-content">
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>

        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab
            label="As a Seeker"
            sx={{
              color: selectedTab === 0 ? "black" : "gray", // black when active, gray when inactive
              fontWeight: selectedTab === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="As an Employer"
            sx={{
              color: selectedTab === 1 ? "black" : "gray", // black when active, gray when inactive
              fontWeight: selectedTab === 1 ? "bold" : "normal",
            }}
          />
        </Tabs>

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
              style: { color: "black" },
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
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
          // onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>

        <Typography variant="body2" sx={{ marginTop: 2 }}>
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
