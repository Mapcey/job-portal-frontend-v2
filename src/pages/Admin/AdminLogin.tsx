import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await setPersistence(auth, browserLocalPersistence);
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const token = await credential.user.getIdToken();
      const role = await login(token);

      if (role !== "admin") {
        logout();
        setError("This Firebase account does not have administrator access.");
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (signInError: unknown) {
      logout();
      const errorCode = (signInError as { code?: string })?.code;
      setError(
        errorCode === "auth/invalid-credential" || errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password"
          ? "Invalid email or password."
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background: "linear-gradient(135deg, #fff7ed 0%, #f8fafc 55%, #eef2ff 100%)",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 430, borderRadius: 3, boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)" }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Job Portal Administration
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={800} mb={1}>
            Admin sign in
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Sign in with your administrator Firebase account.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={submitting}
              sx={{ mt: 2, py: 1.25, fontWeight: 700 }}
            >
              {submitting ? "Signing in…" : "Sign in as admin"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
