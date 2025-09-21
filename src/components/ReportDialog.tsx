import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  DialogContentText,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  mode: string;
  id: number;
}

export default function ReportDialog({
  open,
  onClose,
  mode,
  id,
}: ReportDialogProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userID, setUserID] = useState();
  const { userInfo } = useAuth();

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) setUserID(userInfo.UserId);
  }, [userInfo]);

  const handleSubmit = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    console.log("Report submitted:", { reason, description });
    setConfirmOpen(false);
    onClose();
    setReason("");
    setDescription("");
  };

  return (
    <>
      {/* Main Report Dialog */}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#333", fontWeight: 600 }}>
          Report a Problem
        </DialogTitle>
        <DialogContent dividers>
          {/* Reason Dropdown */}
          <FormControl fullWidth size="small" margin="dense" variant="outlined">
            <InputLabel htmlFor="reason-select" sx={{ color: "gray" }}>
              Reason
            </InputLabel>
            <Select
              id="reason-select"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              input={<OutlinedInput label="Reason" />}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#999",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#666",
                },
                color: "#333",
              }}
            >
              <MenuItem value="bug">Bug</MenuItem>
              <MenuItem value="inaccurate">Inaccurate Information</MenuItem>
              <MenuItem value="abuse">Abuse / Spam</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Description Textbox */}
          <TextField
            margin="dense"
            label="Describe the issue"
            type="text"
            fullWidth
            multiline
            minRows={3}
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiInputBase-input": { color: "#333" },
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#999",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#666",
              },
            }}
          />
        </DialogContent>

        {/* Actions */}
        <DialogActions>
          <Button onClick={onClose} color="inherit" size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={!reason}
            size="small"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ color: "#333", fontWeight: 600 }}>
          Confirm Submission
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#555" }}>
            Are you sure you want to submit this report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            color="inherit"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            size="small"
          >
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
