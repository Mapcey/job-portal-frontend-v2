// 📁 components/ApplicantsDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Typography,
  Select,
  MenuItem,
  Box,
  ListItemIcon,
} from "@mui/material";
import { format } from "date-fns";
import {
  HourglassEmpty,
  PlaylistAddCheck,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

import { candidate } from "../../types/candidates";

interface ApplicantsDialogProps {
  open: boolean;
  onClose: () => void;
  jobId: string | number | null;
  candidates: candidate[];
  onStatusChange: (candidate: candidate, newStatus: string) => void;
}

const statusPriority: Record<string, number> = {
  Sent: 1, // Pending
  Processing: 2, // Shortlisted
  Reviewed: 3, // Selected
  Rejected: 4, // Rejected (always last)
};

const statusOptions = {
  Sent: {
    label: "Pending",
    icon: <HourglassEmpty fontSize="small" color="warning" />,
  },
  Processing: {
    label: "Shortlisted",
    icon: <PlaylistAddCheck fontSize="small" color="info" />,
  },
  Reviewed: {
    label: "Selected",
    icon: <CheckCircle fontSize="small" color="success" />,
  },
  Rejected: {
    label: "Rejected",
    icon: <Cancel fontSize="small" color="error" />,
  },
};

const ApplicantsDialog: React.FC<ApplicantsDialogProps> = ({
  open,
  onClose,
  jobId,
  candidates,
  onStatusChange,
}) => {
  const sortedCandidates = [...candidates].sort((a, b) => {
    const statusA = a.Status || "Sent"; // default to Pending if no status
    const statusB = b.Status || "Sent";
    return statusPriority[statusA] - statusPriority[statusB];
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Applicants for Job #{jobId}</DialogTitle>
      <DialogContent dividers>
        {candidates.length > 0 ? (
          <List>
            {sortedCandidates.map((candidate, index) => (
              <ListItem
                key={index}
                divider
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {/* Avatar */}
                <ListItemAvatar>
                  <Avatar src={"/default-avatar.png"} />
                </ListItemAvatar>

                {/* Text info */}
                <ListItemText
                  primary={candidate.ApplicantName}
                  secondary={`Date: ${
                    candidate.AppliedDateTime
                      ? format(
                          new Date(candidate.AppliedDateTime),
                          "dd MMM yyyy, hh:mm a"
                        )
                      : "N/A"
                  }`}
                  primaryTypographyProps={{
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />

                {/* Actions */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Button
                    sx={{
                      borderRadius: 5,
                      color: "secondary.main",
                      borderColor: "black",
                    }}
                    variant="outlined"
                    onClick={() => {
                      window.open(
                        `/seeker_account/${candidate.SeekerId}`,
                        "_blank"
                      );
                    }}
                  >
                    View Profile
                  </Button>

                  <Select
                    size="small"
                    value={candidate.Status || ""}
                    displayEmpty
                    onChange={(e) =>
                      onStatusChange(candidate, e.target.value as string)
                    }
                    renderValue={(selected) => {
                      if (!selected) return "Choose status";
                      const option =
                        statusOptions[selected as keyof typeof statusOptions];
                      return (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {option.icon}
                          <Typography variant="body2">
                            {option.label}
                          </Typography>
                        </Box>
                      );
                    }}
                  >
                    {Object.entries(statusOptions).map(
                      ([value, { label, icon }]) => (
                        <MenuItem key={value} value={value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {icon}
                            <Typography variant="body2">{label}</Typography>
                          </Box>
                        </MenuItem>
                      )
                    )}
                  </Select>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No applicants found for this job.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicantsDialog;
