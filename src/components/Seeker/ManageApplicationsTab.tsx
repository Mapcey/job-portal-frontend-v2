import { useState, useEffect } from "react";
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
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import {
  getSeekerApplications,
  deleteSeekerApplications,
} from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { ApplicationsSeeker } from "../../types/applicationsSeeker";

const ManageApplicationsTab = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [seekerID, setSeekerID] = useState<number>(0);
  const [application, setApplication] = useState<ApplicationsSeeker[]>([]);

  // Get seeker ID from context
  useEffect(() => {
    if (userInfo && "UserId" in userInfo) {
      setSeekerID(userInfo.UserId);
      console.log("SeekerID from context:", userInfo.UserId);
    }
  }, [userInfo]);

  // Fetch applications
  useEffect(() => {
    const fetchData = async () => {
      if (seekerID !== 0) {
        try {
          const data = await getSeekerApplications(seekerID.toString());
          setApplication(data);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        }
      }
    };
    fetchData();
  }, [seekerID]);

  const handleOpenApplication = (jobId: number) => {
    navigate(`/jobs/details/${jobId}`);
  };

  const handleRemove = async (applicationId: number) => {
    try {
      await deleteSeekerApplications(applicationId); // pass both IDs
      setApplication((prev) =>
        prev.filter((app) => app.ApplicationId !== applicationId)
      );
    } catch (err) {
      console.error("Failed to remove application:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Applied Jobs ({application.length})
      </Typography>

      <Box
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {application.map((app) => (
          <Card
            key={app.ApplicationId}
            variant="outlined"
            sx={{
              position: "relative",
              paddingTop: "20px",
              marginBottom: "20px",
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(app.ApplicationId);
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
              <PersonRemoveAlt1Icon />
            </IconButton>

            <CardActionArea onClick={() => handleOpenApplication(app.JobId)}>
              <CardContent>
                <Typography variant="h6">{app.ApplicantName}</Typography>
                <Typography mb={1} color="secondary">
                  {app.JobTitle} - {app.JobCategory}
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
                  dangerouslySetInnerHTML={{ __html: app.Description }}
                />

                <Typography variant="body2" color="text.secondary">
                  Status: {app.Status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Applied on: {new Date(app.AppliedDateTime).toLocaleString()}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  <Chip
                    label={app.Status}
                    variant="outlined"
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={app.JobCategory}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        {application.length === 0 && (
          <Typography variant="h5" color="secondary.light">
            No applications yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManageApplicationsTab;
