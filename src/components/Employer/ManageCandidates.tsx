import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Avatar,
  Button,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import { SelectAllRounded } from "@mui/icons-material";
import { format } from "date-fns";

import { useAuth } from "../../context/AuthContext";
import { getAllCandidates } from "../../services/APIs/APIs";
import { applicationStatusUpdate } from "../../services/APIs/APIs";
import { candidate } from "../../types/candidates";

const ManageCandidatesTab = () => {
  const { userInfo } = useAuth();
  const [appliedCandidates, setAppliedCandidates] = useState<candidate[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications for this employer
  useEffect(() => {
    const fetchApplications = async () => {
      if (!userInfo || !("EmployerId" in userInfo)) return;

      try {
        setLoading(true);
        const data = await getAllCandidates(userInfo.EmployerId.toString());
        // ✅ filter out rejected applications
        setAppliedCandidates(
          data.filter((a: candidate) => a.Status !== "Rejected")
        );
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userInfo]);

  // Utility function for random color
  const getRandomColor = (name: string) => {
    const colors = [
      "#FF6B6B",
      "#6BCB77",
      "#4D96FF",
      "#FFD93D",
      "#845EC2",
      "#FF9671",
      "#00C9A7",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // ✅ Update status handler
  const handleStatusUpdate = async (
    applicationId: string,
    newStatus: string
  ) => {
    try {
      // Update status in backend
      await applicationStatusUpdate(applicationId, {
        Status: newStatus,
      });

      setAppliedCandidates((prev) => {
        if (newStatus === "Rejected") {
          // Remove rejected candidate
          return prev.filter(
            (a) => a.ApplicationId.toString() !== applicationId
          );
        } else {
          // Update status for selected/shortlisted
          return prev.map((a) =>
            a.ApplicationId.toString() === applicationId
              ? { ...a, Status: newStatus }
              : a
          );
        }
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
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
                boxShadow: 2,
                borderRadius: 2,
              }}
            >
              <Button
                sx={{
                  position: "absolute",
                  borderRadius: 2,
                  top: 5,
                  right: 5,
                  zIndex: 1,
                  backgroundColor: "error.main",
                  opacity: 0.7,
                  color: "white",
                  boxShadow: 1,
                  ":hover": { backgroundColor: "error.main", opacity: 1 },
                }}
                onClick={() =>
                  handleStatusUpdate(job.ApplicationId.toString(), "Rejected")
                }
              >
                <PersonRemoveAlt1Icon sx={{ mr: 1 }} />
                Reject
              </Button>

              <Button
                sx={{
                  position: "absolute",
                  borderRadius: 2,
                  bottom: 5,
                  right: 5,
                  zIndex: 1,
                  backgroundColor: "success.main",
                  opacity: 0.7,
                  color: "white",
                  boxShadow: 1,
                  ":hover": { backgroundColor: "success.main", opacity: 1 },
                }}
                onClick={() =>
                  handleStatusUpdate(job.ApplicationId.toString(), "Selected")
                }
              >
                <SelectAllRounded sx={{ mr: 1 }} />
                Select
              </Button>

              <CardActionArea>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      alt={job.ApplicantName}
                      src={"/default-avatar.png"}
                      sx={{
                        width: 48,
                        height: 48,
                        mr: 2,
                        bgcolor: getRandomColor(job.ApplicantName || "U"),
                      }}
                    />
                    <Box>
                      {/* Seeker name link */}
                      <Link
                        to={`/seeker_account/${job.SeekerId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              fontWeight: "bold",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {job.ApplicantName}
                        </Typography>
                      </Link>

                      {/* Job title link */}
                      <Link
                        to={`/jobs/details/${job.JobId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              fontWeight: "bold",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {job.JobTitle}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>

                  {/* Description (truncated) */}
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3, // max 3 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    component="div"
                    dangerouslySetInnerHTML={{ __html: job.Description }}
                  />

                  {/* Chips */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Chip
                      label={job.JobCategory}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                    <Chip
                      label={
                        job.AppliedDateTime
                          ? format(
                              new Date(job.AppliedDateTime),
                              "dd MMM yyyy, hh:mm a"
                            )
                          : "N/A"
                      }
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
