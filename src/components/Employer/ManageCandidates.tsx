import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

import { useAuth } from "../../context/AuthContext";
import { getAllApplications } from "../../services/APIs/APIs";

interface CandidateApplication {
  ApplicationId: number;
  SeekerName: string;
  JobTitle: string;
  Description: string;
  SalaryRange: string;
  EducationLevel: string;
  Location: string;
}

const ManageCandidatesTab = () => {
  const { userInfo } = useAuth();
  const [appliedCandidates, setAppliedCandidates] = useState<
    CandidateApplication[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications for this employer
  useEffect(() => {
    const fetchApplications = async () => {
      if (!userInfo || !("EmployerId" in userInfo)) return;

      try {
        setLoading(true);
        const data = await getAllApplications(userInfo.EmployerId.toString());
        setAppliedCandidates(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userInfo]);

  const handleRemove = (id: number) => {
    // UI-only remove for now (API call can be added later)
    const updatedJobs = appliedCandidates.filter(
      (job) => job.ApplicationId !== id
    );
    setAppliedCandidates(updatedJobs);
  };

  return (
    <Box className="saved-jobs-tab-container" sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Applied Candidates ({appliedCandidates.length})
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          className="saved-jobs-tab-content"
          sx={{
            maxHeight: "600px",
            overflowY: "auto",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {appliedCandidates.map((job) => (
            <Card
              key={job.ApplicationId}
              variant="outlined"
              sx={{
                position: "relative",
                paddingTop: "20px",
                marginBottom: "20px",
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleRemove(job.ApplicationId)}
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
                <PersonRemoveAlt1Icon />
              </IconButton>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">{job.SeekerName}</Typography>
                  <Typography mb={3} color="secondary">
                    {job.JobTitle}
                  </Typography>

                  <Typography variant="body1">{job.Description}</Typography>

                  {/* Chips */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      marginTop: 2,
                    }}
                  >
                    <Chip
                      label={job.SalaryRange}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={job.EducationLevel}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={job.Location}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}

          {appliedCandidates.length === 0 && !loading && (
            <Typography
              variant="h5"
              color="secondary.light"
              textAlign="center"
              mt={4}
            >
              No Applications yet.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageCandidatesTab;
