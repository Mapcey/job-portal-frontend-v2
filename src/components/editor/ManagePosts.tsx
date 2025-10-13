import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";

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
  Badge,
} from "@mui/material";
import {
  Delete,
  Cancel,
  RemoveRedEye,
  DocumentScanner,
} from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";
import { EMP_POSTED_JOBS } from "../../types/job";
import {
  getEmployerPostedJobs,
  deleteJob,
  editJob,
  getCandidatesOfJob,
  applicationStatusUpdate,
} from "../../services/APIs/APIs";
import ApplicantsDialog from "../Employer/ApplicationsDialog";

const ManagePosts = () => {
  const [jobs, setJobs] = useState<EMP_POSTED_JOBS[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [applicationCounts, setApplicationCounts] = useState<{
    [jobId: string]: number;
  }>({});

  const [openApplicantsDialog, setOpenApplicantsDialog] = useState(false);
  const [selectedJobCandidates, setSelectedJobCandidates] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const counts: { [jobId: string]: number } = {};
        for (const job of jobs) {
          const candidates = await getCandidatesOfJob(job.JobId);
          counts[job.JobId] = candidates.length; // assuming API returns an array
        }
        setApplicationCounts(counts);
      } catch (error) {
        console.error("Error fetching application counts:", error);
      }
    };

    if (jobs.length > 0) {
      fetchCounts();
    }
  }, [jobs]);

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

  const handleClose = async (id: number) => {
    try {
      // Find the job that needs to be updated
      const jobToUpdate = jobs.find((job) => job.JobId === id);
      if (!jobToUpdate) return;

      // Create updated job object with status = Closed
      const updatedJob = { ...jobToUpdate, Status: "Closed" };

      // Call API to update the job
      await editJob(id.toString(), updatedJob);

      // Update state locally
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.JobId === id ? { ...job, Status: "Closed" } : job
        )
      );

      console.log(`Job ${id} closed successfully`);
    } catch (err) {
      console.error("Failed to close job:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id.toString()); // API expects string id
      // remove job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job.JobId !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const handleview = (id: number) => {
    navigate(`/jobs/details/${id}`);
  };

  const BrowsePostJob = () => {
    navigate("/employer/post");
  };

  const handleApplicants = async (jobId: number) => {
    try {
      const candidates = await getCandidatesOfJob(jobId);
      setSelectedJobCandidates(candidates);
      setSelectedJobId(jobId);
      setOpenApplicantsDialog(true);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header and Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">
          Manage Job Openings ({jobs.length})
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            border: "1px dashed",
            borderColor: "grey.400",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="lightgray">
            No jobs posted yet.
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={BrowsePostJob}
          >
            Post a Job
          </Button>
        </Box>
      ) : (
        <List>
          {jobs.map((job) => {
            const expiryDate = new Date(job.ExpiryDate);
            const daysRemaining = differenceInDays(expiryDate, new Date());

            return (
              <Box key={job.JobId}>
                <ListItem
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
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
                      <div>
                        {/* Status Chip */}
                        <Chip
                          label={`Status: ${job.Status}`}
                          color={job.Status === "Active" ? "success" : "error"}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />

                        {/* Expiry Info */}
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            color: "black",
                          }}
                        >
                          Expires on: {expiryDate.toDateString()}{" "}
                          {daysRemaining > 0
                            ? `(${daysRemaining} days left)`
                            : "(Expired)"}
                        </Typography>
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        sx={{ color: "secondary.main" }}
                        startIcon={<RemoveRedEye />}
                        onClick={() => handleview(job.JobId)}
                      >
                        Preview
                      </Button>

                      <Badge
                        badgeContent={applicationCounts[job.JobId] || 0}
                        color="primary"
                        overlap="circular"
                      >
                        <Button
                          size="small"
                          sx={{ color: "secondary.main" }}
                          startIcon={<DocumentScanner />}
                          onClick={() => handleApplicants(job.JobId)}
                        >
                          Applicants
                        </Button>
                      </Badge>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        color="warning"
                        startIcon={<Cancel />}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to close this post?"
                            )
                          ) {
                            handleClose(job.JobId);
                          }
                        }}
                        disabled={job.Status === "Closed"}
                      >
                        Close Post
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<Delete />}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this post?"
                            )
                          ) {
                            handleDelete(job.JobId);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
              </Box>
            );
          })}
        </List>
      )}
      <ApplicantsDialog
        open={openApplicantsDialog}
        onClose={() => setOpenApplicantsDialog(false)}
        jobId={selectedJobId}
        candidates={selectedJobCandidates}
        onStatusChange={async (candidate, newStatus) => {
          try {
            // Call the API to update the status
            await applicationStatusUpdate(candidate.ApplicationId, {
              Status: newStatus,
            });

            // Update state locally
            setSelectedJobCandidates((prev) =>
              prev.map((c) =>
                c.ApplicationId === candidate.ApplicationId
                  ? { ...c, Status: newStatus }
                  : c
              )
            );
          } catch (error) {
            console.error("Failed to update candidate status:", error);
          }
        }}
      />
    </Box>
  );
};

export default ManagePosts;
