// JobApplicationDialog.tsx

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { saved_jobs } from "../../types/job"; // Adjust to your actual type file

type ApplicationStatus = "confirm" | "loading" | "success" | "error";

interface JobApplicationDialogProps {
  open: boolean;
  job: saved_jobs | null;
  status: ApplicationStatus;
  onClose: () => void;
  onConfirm: () => void;
}

export default function JobApplicationDialog({
  open,
  job,
  status,
  onClose,
  onConfirm,
}: JobApplicationDialogProps) {
  if (!job) return null;

  const isLoading = status === "loading";

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        {status === "confirm" && "Confirm Application"}
        {status === "loading" && "Submitting Application"}
        {status === "success" && "Application Submitted"}
        {status === "error" && "Application Failed"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {status === "confirm" && (
            <>
              <Typography>
                Are you sure you want to apply for this position?
              </Typography>

              <Alert severity="info">
                <Typography fontWeight={600}>{job.JobTitle}</Typography>
                <Typography variant="body2">{job.JobCategory}</Typography>
              </Alert>

              <Typography variant="body2" color="text.secondary">
                Please confirm that you want to submit your application.
              </Typography>
            </>
          )}

          {status === "loading" && (
            <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
              <CircularProgress />
              <Typography>Submitting your application...</Typography>
            </Stack>
          )}

          {status === "success" && (
            <Stack alignItems="center" spacing={1} sx={{ py: 2 }}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 52 }} />

              <Typography textAlign="center">
                Your application for <strong>{job.JobTitle}</strong> was
                submitted successfully.
              </Typography>
            </Stack>
          )}

          {status === "error" && (
            <Alert severity="error" icon={<ErrorOutlineIcon />}>
              You have already applied for this job.
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        {status === "confirm" && (
          <>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="contained"
              disabled={isLoading}
            >
              Confirm & Apply
            </Button>
          </>
        )}

        {status === "loading" && <Button disabled>Submitting...</Button>}

        {status === "success" && (
          <Button onClick={onClose} variant="contained" color="success">
            Done
          </Button>
        )}

        {status === "error" && (
          <>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="contained">
              Try Again
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
