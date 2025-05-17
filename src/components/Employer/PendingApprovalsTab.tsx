import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { Visibility, CheckCircle, Delete } from "@mui/icons-material";

const PendingApprovalsTab = ({
  pendingJobs,
  onApprove,
  onView,
  onDelete,
}: {
  pendingJobs: {
    id: number;
    title: string;
    editor: string;
    submittedAt: string;
  }[];
  onApprove: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h6" color="secondary.main" gutterBottom>
        Pending Job Approvals
      </Typography>

      <Grid container spacing={3}>
        {pendingJobs.map((job) => (
          <Grid key={job.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Submitted by: {job.editor}
                </Typography>
                <Typography variant="caption" color="secondary">
                  Submitted at: {job.submittedAt}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<Visibility />}
                    onClick={() => onView(job.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => onApprove(job.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => onDelete(job.id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PendingApprovalsTab;
