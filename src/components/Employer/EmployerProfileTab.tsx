import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditEmployerProfileImage from "./EditEmployerProfileImage";

import {
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { EMPLOYER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { getEmployerData } from "../../services/APIs/APIs";
import EditIcon from "@mui/icons-material/Edit";
import { getEmployerFiles } from "../../services/APIs/APIs";
import EmployerProfileSkeleton from "../../components/placeholders/EmployerProfileSkeleton";

import { Paper, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

const EmployerProfileTab = () => {
  const [imageSrc, setImageSrc] = useState("");
  // const [files, setFiles] = useState([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false);

  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [employerID, setEmployerID] = useState(0);
  const [user, setUser] = useState<EMPLOYER_DATA | null>(null);
  const [loading, setLoading] = useState(true);

  const [editImageOpen, setEditImageOpen] = useState(false);

  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setEmployerID(userInfo.EmployerId);
      console.log(userInfo.EmployerId);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (employerID === 0) return;

      try {
        // Fetch employer info
        const data = await getEmployerData(employerID.toString());
        setUser(data);

        // Fetch employer files
        const fileData = await getEmployerFiles(employerID);

        // Find profile image
        const profileImage = fileData.find(
          (file: any) => file.FileCategory === "FileType.image",
        );

        if (profileImage && profileImage.FileUrl) {
          setImageSrc(profileImage.FileUrl);
        }

        console.log("Employer data:", data);
        console.log("Employer files:", fileData);
      } catch (error) {
        console.error("Failed to fetch employer data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVideo = async () => {
      setLoadingVideo(true);
      try {
        // 🔹 Fetch employer files (reuse existing endpoint)
        const files = await getEmployerFiles(employerID);
        const videoFile = files.find(
          (file: any) => file.FileCategory === "FileType.video",
        );

        if (videoFile && videoFile.FileUrl) {
          setVideoUrl(videoFile.FileUrl);
        } else {
          setVideoUrl(null);
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setVideoUrl(null);
      } finally {
        setLoadingVideo(false);
      }
    };

    if (employerID) fetchVideo();

    fetchData();
  }, [employerID]);

  const BrowsePostJob = () => {
    navigate("/employer/post");
  };

  const BrowseEditProfile = () => {
    navigate("/employer/edit_profile");
  };

  return (
    <div className="employer-profile-tab-container">
      {loading ? (
        <EmployerProfileSkeleton />
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            mx: "auto",
            pb: 4,
          }}
        >
          {/* Company Header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              alignItems={{ xs: "center", sm: "center" }}
            >
              {/* Company Logo */}
              <Box sx={{ position: "relative", flexShrink: 0 }}>
                <Avatar
                  src={imageSrc}
                  alt="Company profile"
                  sx={{
                    width: { xs: 105, sm: 125 },
                    height: { xs: 105, sm: 125 },
                    border: "4px solid",
                    borderColor: "background.paper",
                    boxShadow: "0 3px 14px rgba(0,0,0,0.12)",
                    bgcolor: "grey.100",
                  }}
                />

                <IconButton
                  aria-label="Edit company logo"
                  onClick={() => setEditImageOpen(true)}
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 3,
                    right: 3,
                    bgcolor: "primary.main",
                    color: "#fff",
                    width: 34,
                    height: 34,
                    border: "3px solid white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>

              {/* Company Information */}
              <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="text.primary"
                  gutterBottom
                >
                  {user?.CompanyName || "Company Name"}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                  color="text.secondary"
                >
                  <LocationOnOutlinedIcon fontSize="small" />
                  <Typography variant="body2">
                    {user?.Location || "Location not provided"}
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  Manage your company profile and showcase your organization to
                  potential candidates.
                </Typography>
              </Box>

              {/* Post Job Button */}
              <Button
                variant="contained"
                onClick={BrowsePostJob}
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  px: 2.5,
                  py: 1.3,
                  fontWeight: 600,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: 2,
                  },
                }}
              >
                Post a New Job
              </Button>
            </Stack>
          </Paper>

          {/* Company Details */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 3,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Company Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your organization's contact details and basic information.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                },
                gap: 2.5,
              }}
            >
              {/* Company Name */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Company Name
                </Typography>
                <TextField
                  fullWidth
                  disabled
                  value={user?.CompanyName || ""}
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#424242",
                      opacity: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                />
              </Box>

              {/* Location */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Head Office Location
                </Typography>
                <TextField
                  fullWidth
                  disabled
                  value={user?.Location || ""}
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#424242",
                      opacity: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                />
              </Box>

              {/* Phone */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Contact Number
                </Typography>
                <TextField
                  fullWidth
                  disabled
                  value={user?.ContactNo || ""}
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#424242",
                      opacity: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                />
              </Box>

              {/* Website */}
              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Company Website
                </Typography>
                <TextField
                  fullWidth
                  disabled
                  value={user?.Website || ""}
                  placeholder="No website provided"
                  size="small"
                  sx={{
                    "& .MuiInputBase-root": {
                      bgcolor: "#fff",
                      borderRadius: 2,
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#424242",
                      opacity: 1,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e0e0e0",
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>

          {/* Company Overview */}
          <Box
            sx={{
              width: "100%",
              minHeight: 100,
              p: { xs: 2.5, md: 3.5 },
              bgcolor: "#fff",
              border: "1px solid",
              borderColor: "#e0e0e0",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="body1"
              color={user?.Overview ? "text.primary" : "text.secondary"}
              sx={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                lineHeight: 1.8,
                fontStyle: user?.Overview ? "normal" : "italic",
              }}
            >
              {user?.Overview || "No company overview provided."}
            </Typography>
          </Box>

          {/* Company Cover Video */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 3,
            }}
          >
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="h6" fontWeight={700}>
                Company Cover Video
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Give potential candidates a glimpse into your organization.
              </Typography>
            </Box>

            {loadingVideo ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  py: 6,
                }}
              >
                <CircularProgress size={32} />
              </Box>
            ) : videoUrl ? (
              <Box
                sx={{
                  maxWidth: 750,
                  mx: "auto",
                  borderRadius: 2.5,
                  overflow: "hidden",
                  bgcolor: "black",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.10)",
                }}
              >
                <video
                  controls
                  preload="metadata"
                  width="100%"
                  style={{
                    display: "block",
                    maxHeight: 420,
                  }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ) : (
              <Box
                sx={{
                  py: 6,
                  px: 2,
                  textAlign: "center",
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <VideocamOutlinedIcon
                  sx={{
                    fontSize: 45,
                    color: "text.secondary",
                    mb: 1,
                  }}
                />

                <Typography fontWeight={600}>
                  No cover video available
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Add a company video to introduce your organization to
                  candidates.
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Bottom Action */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1.5,
            }}
          >
            <Button
              variant="contained"
              onClick={BrowseEditProfile}
              startIcon={<EditIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: 2,
                },
              }}
            >
              Edit Company Profile
            </Button>
          </Box>

          {/* Edit Company Image Dialog */}
          <EditEmployerProfileImage
            open={editImageOpen}
            employerId={employerID}
            currentImage={imageSrc}
            onClose={() => setEditImageOpen(false)}
            onImageUpdated={(imageUrl) => {
              setImageSrc(imageUrl);
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default EmployerProfileTab;
