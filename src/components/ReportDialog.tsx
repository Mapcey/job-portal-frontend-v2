import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { createReport } from "../services/APIs/APIs";
import { useAuth } from "../context/AuthContext";

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "job" | "employer"; // ReportedType
  id: number; // ReportedId
}

const categories = ["spam", "harassment", "other"];

const ReportDialog: React.FC<ReportDialogProps> = ({
  open,
  onClose,
   mode,
  id,
}) => {
  const [description, setDescription] = useState("");
  const [_, setUserID] = useState();
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("spam");

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) setUserID(userInfo.UserId);
  }, [userInfo]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await createReport({
        ReportedType: mode,
        ReportedId: id,
        ReportCategory: category,
        Description: description,
      });
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Failed to create report:", error);
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report {mode}</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Category"
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          multiline
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Submitting…" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
