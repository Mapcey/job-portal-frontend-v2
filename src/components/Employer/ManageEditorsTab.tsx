import { useState, useEffect } from "react";
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
  Tooltip,
  Stack,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "../../context/AuthContext";
// import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { getEditors, createEditor, updateEditorStatus, deleteEditor } from "../../services/APIs/APIs";
import { createNewEditor, getEditors } from "../../services/APIs/APIs";
import { useNotification } from "../../context/NotificationsProvider";
import { EDITOR_DATA } from "../../types/users";

// interface Editor {
//   id: string;
//   email: string;
//   isActive: boolean;
// }

const ManageEditorsTab = () => {
  const { userInfo } = useAuth();

  // Form state
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Qq-11111");
  const [confirmPassword, setConfirmPassword] = useState("Qq-11111");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Editor list
  const [editors, setEditors] = useState<EDITOR_DATA[]>([]);
  const [loading, setLoading] = useState(true);

  const { notify } = useNotification();

  // Fetch editors on mount
  useEffect(() => {
    const fetchEditors = async () => {
      if (!userInfo) return;
      setLoading(true);
      try {
        const data = await getEditors(userInfo.EmployerId);
        setEditors(data);
      } catch (err) {
        console.error("Failed to fetch editors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEditors();

    setEditors;
  }, [userInfo]);

  // Create new editor
  const handleCreateEditor = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Email/ Password required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userPayload = {
        Email: email,
        FirstName: first_name,
        LastName: last_name,
        ContactNo: contact,
        Active: "true",
        Password: password,
      };

      const response = await createNewEditor( userPayload);
      console.log(response);
      
      notify("Account Created", "success");
    } catch (err: any) {
      console.error("Signup failed:", err);
      notify("Account Create faile", "error");
      // const user = auth.currentUser;
      // if (user) {
      //   await deleteUser(user).catch((deleteErr) =>
      //     console.warn("Failed to delete Firebase user:", deleteErr)
      //   );
      // }
      setError(err.message || "An unexpected error occurred during signup");
    } finally {
      console.log('test');
      
    }
  };

  // Activate/Deactivate editor
  // const handleToggleStatus = async (editor: EDITOR_DATA) => {
  //   try {
  //     // const updated = await updateEditorStatus(editor.id, !editor.isActive);
  //     // setEditors((prev) =>
  //     //   prev.map((e) => (e.id === editor.id ? { ...e, isActive: updated.isActive } : e))
  //     // );
  //   } catch (err) {
  //     console.error("Failed to update status:", err);
  //   }
  // };

  // Delete editor
  const handleDeleteEditor = async (editorId: number) => {
    try {
      // await deleteEditor(editorId);
      setEditors((prev) => prev.filter((e) => e.EditorId !== editorId));
    } catch (err) {
      console.error("Failed to delete editor:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Create New Editor
      </Typography>

      <div className="editor-form-row">
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}
      </div>

      <div className="form-container">
        <div className="editor-form-row">
          <TextField
            label="First Name"
            type="text"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            fullWidth
            size="small"
            className="text-field-1"
            required
          />

          <TextField
            label="Last Name"
            type="text"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            fullWidth
            size="small"
            className="text-field-1"
          />
        </div>

        <div className="editor-form-row">
          <TextField
            label="Contact No"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            fullWidth
            size="small"
            className="text-field-1"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            className="text-field-1"
            required
          />
        </div>
        <div className="editor-form-row">
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
        </div>

        <div className="editor-form-row">
          <Button variant="contained" onClick={handleCreateEditor}>
            Create an Editor Account
          </Button>
        </div>
      </div>

      <Typography variant="h6" mb={2} mt={7}>
        Current Editors
      </Typography>
      {loading ? (
        <Typography>Loading editors...</Typography>
) : editors.length === 0 ? (
  <Box
    sx={{
      textAlign: "center",
      mt: 5,
      color: "text.secondary",
      fontStyle: "italic",
    }}
  >
    <Typography variant="body1">No editors created yet.</Typography>
  </Box>

      ) : (
        <Grid container spacing={2}>
          {editors.map((editor) => (
            <Grid key={editor.EditorId}>
              <Card
                sx={{
                  // p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "translateY(-2px)" },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: editor.Active ? "success.main" : "grey.400",
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        {editor.FirstName} {editor.LastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {editor.Email}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: editor.Active
                            ? "success.main"
                            : "text.disabled",
                          fontWeight: 500,
                        }}
                      >
                        {editor.Active ? "Active" : "Inactive"}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Switch
                      checked={editor.Active}
                      // onChange={() => handleToggleStatus(editor)}
                      color="success"
                    />
                  </Stack>
                  <Tooltip title="Delete Editor">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteEditor(editor.EditorId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
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
