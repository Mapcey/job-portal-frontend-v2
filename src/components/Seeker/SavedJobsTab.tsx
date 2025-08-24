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

import { saved_jobs } from "../../types/job";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { getSeekerSavedJobs, deleteSeekerSavedJob  } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";

  const SavedJobsTab = () => {
  const { userInfo } = useAuth();
  const [seekerID, setSeekerID] = useState<number>(0);
  const [savedJobs, setSavedJobs] = useState<saved_jobs[]>([]);

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) {
      setSeekerID(userInfo.UserId);
      console.log(" SeekerID from context:", userInfo.UserId);
    }
  }, [userInfo]);

  const handleRemove = async (jobId: number) => {
    if (!seekerID) return;
    try {
      console.log(`🗑 Removing job with ID: ${jobId}`);
      await deleteSeekerSavedJob(seekerID.toString(), jobId); 
      setSavedJobs((prev) => prev.filter((job) => job.JobId !== jobId)); 
      console.log("Job removed successfully");
    } catch (error) {
      console.error("Failed to remove job:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (seekerID !== 0) {
        console.log("Fetching saved jobs for seekerID:", seekerID);
        try {
          const data = await getSeekerSavedJobs(seekerID.toString());
          console.log("Raw API response:", data);
          setSavedJobs(data);
        } catch (error) {
          console.error("Failed to fetch saved jobs:", error);
        }
      }
    };

    fetchData();
  }, [seekerID]);

  return (
    <Box className="saved-jobs-tab-container" sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Saved Jobs ({savedJobs.length})
      </Typography>

      <Box
        className="saved-jobs-tab-content"
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {savedJobs.map((job) => (
          <Card
            key={job.JobId}
            variant="outlined"
            sx={{
              position: "relative",
              paddingTop: "20px",
              marginBottom: "20px",
            }}
          >
            <IconButton
              size="small"
              onClick={() => handleRemove(job.JobId)}
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
              <BookmarkRemoveIcon />
            </IconButton>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">
                  {job.JobTitle || "Untitled Job"}
                </Typography>
                <Typography mb={3} color="secondary">
                  {job.employer?.CompanyName || "Unknown Company"}
                </Typography>
                <Typography variant="body1">
                  {job.Description || ""}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
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
          <Typography variant="h3" color="secondary.light">
            No saved jobs yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SavedJobsTab;
