import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../context/AuthContext";
// import { getEditors, createEditor, updateEditorStatus, deleteEditor } from "../../services/APIs/APIs";

interface Editor {
  id: string;
  email: string;
  isActive: boolean;
}

const ManageEditorsTab = () => {
  const { userInfo } = useAuth();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Editor list
  const [editors, setEditors] = useState<Editor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch editors on mount
  useEffect(() => {
    const fetchEditors = async () => {
      if (!userInfo) return;
      setLoading(true);
      //   try {
      //     const data = await getEditors(userInfo.EmployerId.toString());
      //     setEditors(data);
      //   } catch (err) {
      //     console.error("Failed to fetch editors:", err);
      //   } finally {
      //     setLoading(false);
      //   }
    };
    fetchEditors();
  }, [userInfo]);

  // Create new editor
  const handleCreateEditor = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // try {
    //   const newEditor = await createEditor({ email, password });
    //   setEditors((prev) => [...prev, newEditor]);
    //   setSuccess("Editor account created successfully.");
    //   setEmail("");
    //   setPassword("");
    //   setConfirmPassword("");
    // } catch (err: any) {
    //   setError(err.message || "Failed to create editor.");
    // }
  };

  // Activate/Deactivate editor
  //   const handleToggleStatus = async (editor: Editor) => {
  //     try {
  //       const updated = await updateEditorStatus(editor.id, !editor.isActive);
  //       setEditors((prev) =>
  //         prev.map((e) => (e.id === editor.id ? { ...e, isActive: updated.isActive } : e))
  //       );
  //     } catch (err) {
  //       console.error("Failed to update status:", err);
  //     }
  //   };

  // Delete editor
  //   const handleDeleteEditor = async (editorId: string) => {
  //     try {
  //       await deleteEditor(editorId);
  //       setEditors((prev) => prev.filter((e) => e.id !== editorId));
  //     } catch (err) {
  //       console.error("Failed to delete editor:", err);
  //     }
  //   };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Create New Editor
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          maxWidth: 400,
        }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          size="small"
          className="text-field-1"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          size="small"
          className="text-field-1"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          size="small"
          className="text-field-1"
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
        <Button variant="contained" onClick={handleCreateEditor}>
          Create an Editor Account
        </Button>
      </Box>

      <Typography variant="h6" mb={2}>
        Current Editors
      </Typography>
      {loading ? (
        <Typography>Loading editors...</Typography>
      ) : (
        <Grid container spacing={2}>
          {editors.map((editor) => (
            <Grid key={editor.id}>
              <Card>
                <CardContent>
                  <Typography variant="body1">{editor.email}</Typography>
                  <Typography
                    variant="body2"
                    color={editor.isActive ? "green" : "gray"}
                  >
                    {editor.isActive ? "Active" : "Inactive"}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Switch
                    checked={editor.isActive}
                    onChange={() => handleToggleStatus(editor)}
                    color="primary"
                  />
                  <IconButton color="error" onClick={() => handleDeleteEditor(editor.id)}>
                    <DeleteIcon />
                  </IconButton> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ManageEditorsTab;
