import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Delete, Cancel, RemoveRedEye } from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";
import { EMP_POSTED_JOBS } from "../../types/job";
import { getEmployerPostedJobs } from "../../services/APIs/APIs";

const PostedJobs = () => {
  const [jobs, setJobs] = useState<EMP_POSTED_JOBS[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userInfo || !("EmployerId" in userInfo)) return;

      try {
        setLoading(true);
        const response = await getEmployerPostedJobs(userInfo.EmployerId);
        setJobs(response); // API returns array of jobs
      } catch (err) {
        console.error("Failed to fetch posted jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userInfo]);

  const handleClose = (id: number) => {
    console.log("Close job:", id);
    // TODO: API call to close job
  };

  const handleDelete = (id: number) => {
    console.log("Delete job:", id);
    // TODO: API call to delete job
  };

  const BrowsePostJob = () => {
    navigate("/employer/post");
  };

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
          onClick={BrowsePostJob}
        >
          Post a New Job
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : jobs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No jobs posted yet.
        </Typography>
      ) : (
        <List>
          {jobs.map((job) => (
            <Box key={job.JobId}>
              <ListItem
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  mb: 1,
                  px: 3,
                  py: 2,
                  bgcolor: "background.paper",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {job.JobTitle}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {job.employer?.CompanyName || ""} – {job.Location}
                      </Typography>
                      <Chip
                        label={`Status: ${job.Status}`}
                        color={job.Status === "Open" ? "success" : "warning"}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      startIcon={<RemoveRedEye />}
                      onClick={() => handleClose(job.JobId)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="warning"
                      startIcon={<Cancel />}
                      onClick={() => handleClose(job.JobId)}
                    >
                      Close Post
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(job.JobId)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PostedJobs;
