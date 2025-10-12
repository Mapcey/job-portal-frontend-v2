import React, { useState } from "react";
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
  const [category, setCategory] = useState("spam");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createReport({
        ReportedType: mode,
        ReportedId: id,
        ReportCategory: category,
        Description: description,
      });
      alert("Report submitted. Thank you!");
      setDescription("");
      setCategory("spam");
      onClose();
    } catch (err) {
      alert("Failed to submit report. Please try again.");
    } finally {
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
