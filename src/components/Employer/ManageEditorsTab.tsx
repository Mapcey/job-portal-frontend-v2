import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Switch,
  Tooltip,
  Stack,
  Avatar,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

import { useAuth } from "../../context/AuthContext";
import {
  createNewEditor,
  getEditors,
  deleteEditor,
  updateEditor,
} from "../../services/APIs/APIs";
import { useNotification } from "../../context/NotificationsProvider";
import { EDITOR_DATA } from "../../types/users";

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

  const fetchEditors = async () => {
    if (!userInfo) return;
    setLoading(true);
    try {
      const data = await getEditors(userInfo.EmployerId);
      setEditors(data);
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch editors:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch editors on mount
  useEffect(() => {
    fetchEditors();
  }, [userInfo]);

  // Create new editor
  const handleCreateEditor = async () => {
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Email/ Password required");
      notify("Email/ Password required", "error");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      notify("Passwords do not match", "error");
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

      const response = await createNewEditor(userInfo.EmployerId, userPayload);
      console.log(response);

      fetchEditors();

      notify("Editor Account Created", "success");
    } catch (err: any) {
      console.error("Signup failed:", err);
      notify("Account Create faile", "error");
      setError(err.message || "An unexpected error occurred during signup");
    } finally {
      console.log("ok");
    }
  };

  // Activate/Deactivate editor
  const handleToggleStatus = async (_editor: EDITOR_DATA) => {
    try {
      const updated = await updateEditor(editor.EditorId, {
        Active: !editor.Active,
      });

      setEditors((prev) =>
        prev.map((e) =>
          e.EditorId === editor.EditorId ? { ...e, Active: updated.Active } : e,
        ),
      );

      if (!editor.Active) {
        notify(`Editor '${editor.FirstName}' Activeted now`, "info");
      } else if (editor.Active) {
        notify(`Editor '${editor.FirstName}' Deactiveted now`, "info");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete editor
  const handleDeleteEditor = async (editorId: number) => {
    try {
      await deleteEditor(9);
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
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Email
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {editors.map((editor) => (
                <TableRow key={editor.EditorId}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* Avatar hidden on mobile */}
                      <Avatar
                        sx={{
                          display: { xs: "none", sm: "flex" },
                          bgcolor: editor.Active ? "success.main" : "grey.400",
                        }}
                      >
                        <PersonIcon />
                      </Avatar>

                      <Typography>
                        {editor.FirstName} {editor.LastName}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Email hidden on mobile */}
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    <Typography variant="body2">{editor.Email}</Typography>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
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

                      <Switch
                        checked={editor.Active}
                        onChange={() => handleToggleStatus(editor)}
                        color="success"
                      />
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Delete Editor">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteEditor(editor.EditorId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageEditorsTab;
