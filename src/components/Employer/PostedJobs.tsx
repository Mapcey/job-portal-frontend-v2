import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Badge,
  IconButton,
} from "@mui/material";
import { DeleteOutline, DocumentScanner } from "@mui/icons-material";

import { Card, CardContent, Divider } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import { EMP_POSTED_JOBS } from "../../types/job";
import {
  getEmployerPostedJobs,
  deleteJob,
  getCandidatesOfJob,
  applicationStatusUpdate,
  updateJobPost,
} from "../../services/APIs/APIs";
import ApplicantsDialog from "./ApplicationsDialog";
import { useNotification } from "../../context/NotificationsProvider";

const PostedJobs = () => {
  const [jobs, setJobs] = useState<EMP_POSTED_JOBS[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [applicationCounts, setApplicationCounts] = useState<{
    [jobId: string]: number;
  }>({});
  // const isMobile = useMediaQuery("(max-width:600px)");

  const [openApplicantsDialog, setOpenApplicantsDialog] = useState(false);
  const [selectedJobCandidates, setSelectedJobCandidates] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const { notify } = useNotification();

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
        console.log(response);

        const filteredJobs = response.filter(
          (job: any) => job.Status !== "Pending",
        );

        setJobs(filteredJobs);
      } catch (err) {
        console.error("Failed to fetch posted jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userInfo]);

  const handleClose = async (id: number, title: string) => {
    try {
      // Call the API to update the status
      await updateJobPost(id, {
        Status: "Closed",
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.JobId === id ? { ...job, Status: "Closed" } : job,
        ),
      );

      notify(title + " closed for applications", "success");
    } catch (error) {
      console.error("Failed to update candidate status:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log(id);

      await deleteJob(id.toString()); // API expects string id
      // remove job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job.JobId !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
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
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Manage Jobs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {jobs.length} job postings
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={BrowsePostJob}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 650,
            px: 2.5,
            boxShadow: "none",
          }}
        >
          + Post a Job
        </Button>
      </Box>

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : jobs.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 7,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography fontWeight={650} mb={1}>
            No jobs posted yet
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Create your first job posting to start receiving applications.
          </Typography>
          <Button variant="contained" onClick={BrowsePostJob}>
            Post a Job
          </Button>
        </Box>
      ) : (
        <Stack spacing={2}>
          {jobs.map((job) => {
            const expiryDate = new Date(job.ExpiryDate);
            const daysRemaining = differenceInDays(expiryDate, new Date());

            const isExpired =
              !Number.isNaN(expiryDate.getTime()) && daysRemaining < 0;

            const isClosed = job.Status === "Closed";
            const isActive = job.Status === "Active" && !isExpired;

            return (
              <Card key={job.JobId} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Box display="flex" justifyContent="space-between" gap={2}>
                    <Box flex={1} minWidth={0}>
                      <Link
                        to={`/job_posts/details/${job.JobId}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Typography
                          fontWeight={700}
                          sx={{
                            wordBreak: "break-word",
                            "&:hover": {
                              color: "primary.main",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {job.JobTitle}
                        </Typography>
                      </Link>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.8}
                      >
                        Expires:{" "}
                        {Number.isNaN(expiryDate.getTime())
                          ? "Date unavailable"
                          : expiryDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                        {" · "}
                        {isExpired
                          ? "Expired"
                          : daysRemaining === 0
                            ? "Expires today"
                            : `${daysRemaining} days remaining`}
                      </Typography>
                    </Box>

                    <Chip
                      label={isExpired && !isClosed ? "Expired" : job.Status}
                      size="small"
                      color={
                        isActive ? "success" : isExpired ? "default" : "error"
                      }
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Badge
                      badgeContent={applicationCounts[job.JobId] || 0}
                      color="primary"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DocumentScanner />}
                        onClick={() => handleApplicants(job.JobId)}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                      >
                        Applicants
                      </Button>
                    </Badge>

                    <Stack direction="row" spacing={1}>
                      {!isClosed && !isExpired && (
                        <Button
                          size="small"
                          color="warning"
                          onClick={() =>
                            window.confirm(
                              "Are you sure you want to close this job?",
                            ) && handleClose(job.JobId, job.JobTitle)
                          }
                          sx={{ textTransform: "none" }}
                        >
                          Close
                        </Button>
                      )}

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          window.confirm(
                            "Are you sure you want to delete this job?",
                          ) && handleDelete(job.JobId)
                        }
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Applicants Dialog */}
      <ApplicantsDialog
        open={openApplicantsDialog}
        onClose={() => setOpenApplicantsDialog(false)}
        jobId={selectedJobId}
        candidates={selectedJobCandidates}
        onStatusChange={async (candidate, newStatus) => {
          try {
            await applicationStatusUpdate(candidate.ApplicationId, {
              Status: newStatus,
            });

            setSelectedJobCandidates((prev) =>
              prev.map((c) =>
                c.ApplicationId === candidate.ApplicationId
                  ? { ...c, Status: newStatus }
                  : c,
              ),
            );
          } catch (error) {
            console.error("Failed to update candidate status:", error);
          }
        }}
      />
    </Box>
  );
};

export default PostedJobs;
