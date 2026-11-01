import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Button,
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
  const seekerID = userInfo?.UserId ?? userInfo?.SeekerId;
  const [application, setApplication] = useState<ApplicationsSeeker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch the signed-in seeker's applications from /seekers/{user_id}/applications.
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      if (!seekerID) {
        setApplication([]);
        setError(userInfo ? "Could not identify your seeker account." : null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getSeekerApplications(seekerID);
        if (!cancelled) setApplication(data);
      } catch (fetchError) {
        console.error("Failed to fetch seeker applications:", fetchError);
        if (!cancelled) {
          setApplication([]);
          setError("Applications could not be loaded. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [seekerID, userInfo, refreshKey]);

  const handleOpenApplication = (jobId: number) => {
    navigate(`/job_posts/details/${jobId}`);
  };

  const handleRemove = async (applicationId: number) => {
    try {
      await deleteSeekerApplications(applicationId); // pass both IDs
      setApplication((prev) =>
        prev.filter((app) => app.ApplicationId !== applicationId)
      );
    } catch (err) {
      console.error("Failed to remove application:", err);
      setError("The application could not be removed. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Applied Jobs ({application.length})
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            seekerID ? (
              <Button color="inherit" size="small" onClick={() => setRefreshKey((key) => key + 1)}>
                Retry
              </Button>
            ) : undefined
          }
        >
          {error}
        </Alert>
      )}

      <Box
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {loading && <CircularProgress size={28} />}

        {!loading && !error && application.map((app) => (
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
                <Typography variant="h6">{app.JobTitle}</Typography>
                <Typography mb={1} color="secondary">
                  {app.JobCategory}
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
                  Applied on: {app.AppliedDateTime && !Number.isNaN(new Date(app.AppliedDateTime).getTime())
                    ? new Date(app.AppliedDateTime).toLocaleString()
                    : "Date unavailable"}
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

        {!loading && !error && application.length === 0 && (
          <Typography variant="h5" color="secondary.light">
            No applications yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManageApplicationsTab;
