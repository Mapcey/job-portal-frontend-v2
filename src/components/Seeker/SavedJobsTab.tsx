import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FlagIcon from "@mui/icons-material/Flag";
import {
  getSeekerSavedJobs,
  deleteSeekerSavedJob,
} from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { saved_jobs } from "../../types/job";

const SavedJobsTab = () => {
  const { userInfo, firebaseUser } = useAuth();
  const [seekerID, setSeekerID] = useState<string | number | null>(null);
  const [savedJobs, setSavedJobs] = useState<saved_jobs[]>([]);
  const navigate = useNavigate();

  // Get seeker ID
  // Get seeker ID (prefer SeekerId from userInfo, fallbacks to other fields, then firebase uid)
  useEffect(() => {
    if (userInfo) {
      if ("SeekerId" in userInfo && userInfo.SeekerId) {
        setSeekerID(userInfo.SeekerId);
        return;
      }
      if ("UserId" in userInfo && userInfo.UserId) {
        setSeekerID(userInfo.UserId);
        return;
      }
      if ("id" in userInfo && userInfo.id) {
        setSeekerID(userInfo.id);
        return;
      }
      if ("userId" in userInfo && userInfo.userId) {
        setSeekerID(userInfo.userId);
        return;
      }
    }

    if (firebaseUser?.uid) {
      setSeekerID(firebaseUser.uid);
      return;
    }
  }, [userInfo, firebaseUser]);

  // Fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      const uid = seekerID;
      if (!uid) return;
      console.debug("Fetching saved jobs for seekerID:", uid);
      try {
        const data: saved_jobs[] = await getSeekerSavedJobs(
          encodeURIComponent(String(uid))
        );
        setSavedJobs(data);
      } catch (err) {
        console.error("Failed to fetch saved jobs:", err);
      }
    };
    fetchSavedJobs();
  }, [seekerID]);

  // Remove saved job
  const handleRemove = async (jobId: number) => {
    const uid = seekerID;
    if (!uid) return;
    try {
      await deleteSeekerSavedJob(encodeURIComponent(String(uid)), jobId);
      setSavedJobs((prev) => prev.filter((job) => job.JobId !== jobId));
    } catch (err) {
      console.error("Failed to remove job:", err);
    }
  };

  // Report job
  const handleReport = (jobId: number) => {
    alert(`Reported Job ID: ${jobId}`);
    // TODO: Call report API here
  };

  // Navigate to job details
  const handleOpenJob = (jobId: number) => {
    navigate(`/jobs/details/${jobId}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Saved Jobs ({savedJobs.length})
      </Typography>

      <Box
        sx={{
          maxHeight: 600,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {savedJobs.map((job) => (
          <Card
            key={job.JobId}
            variant="outlined"
            sx={{ position: "relative", paddingTop: 2 }}
          >
            {/* Remove Job Icon */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(job.JobId);
              }}
              sx={{
                position: "absolute",
                top: 5,
                right: 35, // Shift left for report icon
                zIndex: 1,
                backgroundColor: "white",
                boxShadow: 1,
                ":hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <BookmarkRemoveIcon />
            </IconButton>

            {/* Report Job Icon */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleReport(job.JobId);
              }}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                zIndex: 1,
                backgroundColor: "white",
                boxShadow: 1,
                ":hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <FlagIcon />
            </IconButton>

            <CardActionArea onClick={() => handleOpenJob(job.JobId)}>
              <CardContent>
                <Typography variant="h6">
                  {job.JobTitle || "Untitled Job"}
                </Typography>
                <Typography mb={1} color="text.secondary">
                  {job.employer?.CompanyName || "Unknown Company"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  // 👇 This makes the HTML content render properly
                  dangerouslySetInnerHTML={{ __html: job.Description }}
                />

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  <Chip
                    label={job.SalaryRange || "-"}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={job.EducationLevel || "-"}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={job.Location || "-"}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={job.JobType || "-"}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        {savedJobs.length === 0 && (
          <Typography variant="h5" color="text.secondary">
            No saved jobs yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SavedJobsTab;
