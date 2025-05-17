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
import { Delete, Cancel } from "@mui/icons-material";

const PostedJobs = ({
  jobs,
  onClose,
  onDelete,
}: {
  jobs: {
    id: number;
    title: string;
    company: string;
    location: string;
    status: string;
  }[];
  onClose: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <Box sx={{ mt: 6 }}>
      {/* Header and Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" color="secondary.main">
          Manage Job Openings
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Post a New Job
        </Button>
      </Box>

      {/* Job Cards */}
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid key={job.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company} – {job.location}
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    job.status === "Open" ? "success.main" : "warning.main"
                  }
                  sx={{ mt: 1, display: "block" }}
                >
                  Status: {job.status}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    color="warning"
                    startIcon={<Cancel />}
                    onClick={() => onClose(job.id)}
                  >
                    Close Post
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
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

export default PostedJobs;
