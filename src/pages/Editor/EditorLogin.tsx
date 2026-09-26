import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationsProvider";

const EditorLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginEditor } = useAuth();
  const { notify } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;

      // First login / email not verified
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);

        notify(
          "Verification email sent. Please verify your email before logging in.",
          "info",
        );

        return;
      }

      // Email already verified
      const token = await user.getIdToken();
      const result = await loginEditor(token);

      if (result === "inactive") {
        await signOut(auth);
        notify("Inactive Account", "error");
        return;
      }

      navigate("/editor");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unexpected login error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: 6,
          bgcolor: "white",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
            flexDirection="column"
          >
            <LockOutlined sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />

            <Typography variant="h5" fontWeight={600}>
              Editor Login
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Sign in to your editor account
            </Typography>
          </Box>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditorLogin;
