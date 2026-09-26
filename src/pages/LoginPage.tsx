import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Header_1 from "../components/header/Header_1";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

// ─── Design tokens (matches the rest of the portal) ──────────────────────────
const ACCENT      = "#f36d00";
const ACCENT_DARK = "#d45f00";
const ACCENT_LIGHT = "#fff7ed";
const BORDER      = "#e2e8f0";
const SURFACE     = "#f8fafc";
const TEXT_PRIMARY = "#0f172a";
const TEXT_MUTED  = "#64748b";

const LoginPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [message, setMessage]           = useState(
    (location.state as { message?: string } | null)?.message || ""
  );
  const [loading, setLoading]           = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => { localStorage.removeItem("editorLogin"); });

  const firebaseErrorMessage = (err: any) => {
    const code = err?.code || "";
    switch (code) {
      case "auth/invalid-credential":    return "Invalid email or password. Please try again.";
      case "auth/password-does-not-meet-requirements":
        return "Your password must include at least one uppercase letter, one number, and one special character (such as !, @, or #).";
      case "auth/user-not-found":        return "No account found for this email. Please sign up first.";
      case "auth/wrong-password":        return "Incorrect password. Use 'Forgot password' to reset it.";
      case "auth/too-many-requests":     return "Too many attempts. Please wait and try again later.";
      case "auth/popup-closed-by-user":  return "Sign-in popup was closed. Please try again.";
      case "auth/popup-blocked":         return "Popup blocked by your browser. Allow popups and retry.";
      case "auth/cancelled-popup-request": return "Sign-in was cancelled. Please try again.";
      default: return err?.message || "An unexpected error occurred.";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setError("Please verify your email before logging in.");
        return;
      }
      const token   = await userCredential.user.getIdToken();
      const success = await login(token);
      if (success === "employer") navigate("/employer/profile/");
      else if (success === "seeker") navigate("/seeker/profile/");
      else if (success === "admin")  navigate("/admin/dashboard");
      else setError("Authentication failed. Please try again.");
    } catch (err: any) {
      setError(firebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError(""); setMessage("");
    if (!email.trim()) { setError("Enter your email address to reset your password."); return; }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("A password reset link has been sent to your email.");
    } catch (err: any) {
      setError(firebaseErrorMessage(err));
    }
  };

  const handleGoogleSignIn = async () => {
    setError(""); setGoogleLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const token  = await result.user.getIdToken();
      const role   = await login(token);
      if (role === "employer")     navigate("/employer/profile/");
      else if (role === "seeker")  navigate("/seeker/profile/");
      else if (role === "admin")   navigate("/admin/dashboard");
      else setError("Your Google account is not registered in the job portal.");
    } catch (err: any) {
      setError(firebaseErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  };

  const browseEditorLogin = () => {
    localStorage.setItem("editorLogin", "true");
    navigate("/editor_login");
  };

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
        <Box sx={{ width: "100%", maxWidth: 460 }}>

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
            {/* Card header strip */}
            <Box
              sx={{
                bgcolor: ACCENT,
                px: 3,
                py: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                👤
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
                  Welcome back
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)" }}>
                  Sign in to your account
                </Typography>
              </Box>
            </Box>

            {/* Form body */}
            <Box sx={{ p: { xs: 2.5, sm: 3 } }}>

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

              {/* Success message */}
              {message && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2.5,
                    px: 2,
                    py: 1.5,
                    bgcolor: "#f0fff4",
                    border: "1px solid #9ae6b4",
                    borderRadius: 2,
                    color: "#276749",
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 18, mt: "2px", flexShrink: 0 }} />
                  <Typography variant="body2" fontWeight={600}>{message}</Typography>
                </Box>
              )}

              {/* Form */}
              <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_PRIMARY, mb: 0.5 }}
                  >
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

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: TEXT_PRIMARY }}>
                      Password
                    </Typography>
                    <Typography
                      onClick={handlePasswordReset}
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: ACCENT,
                        cursor: "pointer",
                        "&:hover": { color: ACCENT_DARK, textDecoration: "underline" },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Box>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    size="small"
                    placeholder="Enter your password"
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
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Login button */}
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
                  {loading ? "Signing in…" : "Sign in"}
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

              {/* Google button */}
              <Button
                variant="outlined"
                fullWidth
                disabled={googleLoading}
                onClick={handleGoogleSignIn}
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
                {googleLoading ? "Signing in…" : "Continue with Google"}
              </Button>

              {/* Sign up */}
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
                  Don't have an account?
                </Typography>
                <Typography
                  onClick={() => navigate("/signup")}
                  sx={{
                    fontSize: "0.88rem",
                    fontWeight: 800,
                    color: ACCENT,
                    cursor: "pointer",
                    "&:hover": { color: ACCENT_DARK, textDecoration: "underline" },
                  }}
                >
                  Sign up
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Editor login link */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography
              onClick={browseEditorLogin}
              sx={{
                fontSize: "0.8rem",
                color: TEXT_MUTED,
                cursor: "pointer",
                "&:hover": { color: ACCENT },
              }}
            >
              Editor login
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;