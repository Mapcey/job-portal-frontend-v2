import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  deleteUser,
  sendEmailVerification,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";
import { signupSeeker, signupEmployer } from "../services/APIs/APIs";

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT       = "#f36d00";
const ACCENT_DARK  = "#d45f00";
const ACCENT_LIGHT = "#fff7ed";
const BORDER       = "#e2e8f0";
const SURFACE      = "#f8fafc";
const TEXT_PRIMARY = "#0f172a";
const TEXT_MUTED   = "#64748b";

const SignupPage = () => {
  const navigate             = useNavigate();
  const { setUserRoleAndInfo } = useAuth();

  const [selectedTab, setSelectedTab]               = useState<0 | 1>(0);
  const [email, setEmail]                           = useState("");
  const [password, setPassword]                     = useState("");
  const [confirmPassword, setConfirmPassword]       = useState("");
  const [showPassword, setShowPassword]             = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError]                           = useState("");
  const [loading, setLoading]                       = useState(false);
  const [googleLoading, setGoogleLoading]           = useState(false);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(console.error);
  }, []);

  const signupErrorMessage = (err: any) => {
    if (err?.code === "auth/password-does-not-meet-requirements") {
      return "Your password must include at least one uppercase letter, one number, and one special character (such as !, @, or #).";
    }

    return err?.message || "An unexpected error occurred during signup.";
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.email) throw new Error("Email not found in Firebase user.");

      const userPayload = { ContactNo: "12345", Email: user.email };

      if (selectedTab === 0) {
        const response = await signupSeeker(userPayload);
        if (response) {
          await sendEmailVerification(user);
          setUserRoleAndInfo("seeker", response);
          navigate("/seeker/register");
        }
      } else {
        const response = await signupEmployer(userPayload);
        if (response.FirebaseUID === user.uid) {
          await sendEmailVerification(user);
          setUserRoleAndInfo("employer", response);
          navigate("/employer/register");
        } else {
          throw new Error(response.message || "Signup failed");
        }
      }
    } catch (err: any) {
      const user = auth.currentUser;
      if (user) await deleteUser(user).catch(console.warn);
      setError(signupErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(""); setGoogleLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user   = result.user;
      if (!user.email) throw new Error("Email not found in Google account.");

      const userPayload = { ContactNo: user.phoneNumber || "12345", Email: user.email };

      if (selectedTab === 0) {
        const response = await signupSeeker(userPayload);
        setUserRoleAndInfo("seeker", response);
        navigate("/seeker/register");
      } else {
        const response = await signupEmployer(userPayload);
        if (response.FirebaseUID !== user.uid) throw new Error(response.message || "Signup failed");
        setUserRoleAndInfo("employer", response);
        navigate("/employer/register");
      }
    } catch (err: any) {
      await signOut(auth).catch(console.warn);
      if (err?.response?.status === 409) {
        setError("An account with this Google email already exists. Please log in instead.");
      } else {
        setError(err.message || "An unexpected error occurred during Google sign-up.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const isSeeker = selectedTab === 0;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: SURFACE }}>
      <Header_1 />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 4, md: 7 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 480 }}>

          {/* Card */}
          <Box
            sx={{
              bgcolor: "#fff",
              border: `1px solid ${BORDER}`,
              borderRadius: 3,
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Header strip */}
            <Box sx={{ bgcolor: ACCENT, px: 3, py: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 36, height: 36, bgcolor: "rgba(255,255,255,0.2)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                ✨
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
                  Create your account
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)" }}>
                  Join as a {isSeeker ? "job seeker" : "employer"} today
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: { xs: 2.5, sm: 3 } }}>

              {/* Role selector */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1,
                  mb: 3,
                  p: 0.6,
                  bgcolor: SURFACE,
                  borderRadius: 2,
                  border: `1px solid ${BORDER}`,
                }}
              >
                {[
                  { label: "Job Seeker", icon: <PersonOutlineIcon fontSize="small" /> },
                  { label: "Employer",   icon: <WorkOutlineIcon fontSize="small" /> },
                ].map((tab, idx) => (
                  <Box
                    key={tab.label}
                    onClick={() => { setSelectedTab(idx as 0 | 1); setError(""); }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.75,
                      py: 1.1,
                      px: 1,
                      borderRadius: 1.5,
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      transition: "all 0.2s",
                      bgcolor: selectedTab === idx ? "#fff" : "transparent",
                      color: selectedTab === idx ? ACCENT : TEXT_MUTED,
                      boxShadow: selectedTab === idx ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                      border: selectedTab === idx ? `1px solid ${BORDER}` : "1px solid transparent",
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </Box>
                ))}
              </Box>

              {/* Error */}
              {error && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2.5,
                    px: 2,
                    py: 1.5,
                    bgcolor: "#fff5f5",
                    border: "1px solid #fed7d7",
                    borderRadius: 2,
                    color: "#c53030",
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: 18, mt: "2px", flexShrink: 0 }} />
                  <Typography variant="body2" fontWeight={600}>{error}</Typography>
                </Box>
              )}

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleSignup}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                {/* Email */}
                <Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_PRIMARY, mb: 0.5 }}>
                    Email address
                  </Typography>
                  <TextField
                    type="email"
                    fullWidth
                    required
                    size="small"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: ACCENT },
                        "&.Mui-focused fieldset": { borderColor: ACCENT },
                      },
                    }}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_PRIMARY, mb: 0.5 }}>
                    Password
                  </Typography>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
                    placeholder="Use a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: ACCENT },
                        "&.Mui-focused fieldset": { borderColor: ACCENT },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Confirm password */}
                <Box>
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_PRIMARY, mb: 0.5 }}>
                    Confirm password
                  </Typography>
                  <TextField
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPassword && confirmPassword !== password}
                    helperText={!!confirmPassword && confirmPassword !== password ? "Passwords do not match" : ""}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: ACCENT },
                        "&.Mui-focused fieldset": { borderColor: ACCENT },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                            {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 0.5,
                    py: 1.3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 800,
                    fontSize: "0.97rem",
                    bgcolor: ACCENT,
                    boxShadow: "none",
                    "&:hover": { bgcolor: ACCENT_DARK, boxShadow: "none" },
                    "&.Mui-disabled": { bgcolor: "#fed7aa", color: "#fff" },
                  }}
                >
                  {loading ? "Creating account…" : `Sign up as ${isSeeker ? "Job Seeker" : "Employer"}`}
                </Button>
              </Box>

              {/* Divider */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 2.5 }}>
                <Box sx={{ flex: 1, height: "1px", bgcolor: BORDER }} />
                <Typography sx={{ fontSize: "0.78rem", color: TEXT_MUTED, fontWeight: 600 }}>
                  or continue with
                </Typography>
                <Box sx={{ flex: 1, height: "1px", bgcolor: BORDER }} />
              </Box>

              {/* Google */}
              <Button
                variant="outlined"
                fullWidth
                disabled={googleLoading}
                onClick={handleGoogleSignUp}
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                }
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  borderColor: BORDER,
                  color: TEXT_PRIMARY,
                  "&:hover": { borderColor: ACCENT, bgcolor: ACCENT_LIGHT },
                }}
              >
                {googleLoading ? "Signing up…" : "Continue with Google"}
              </Button>

              {/* Login link */}
              <Box
                sx={{
                  mt: 2.5,
                  pt: 2.5,
                  borderTop: `1px solid ${BORDER}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                }}
              >
                <Typography sx={{ fontSize: "0.88rem", color: TEXT_MUTED }}>
                  Already have an account?
                </Typography>
                <Typography
                  onClick={() => navigate("/login")}
                  sx={{
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    color: ACCENT,
                    cursor: "pointer",
                    "&:hover": { color: ACCENT_DARK, textDecoration: "underline" },
                  }}
                >
                  Sign in
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;