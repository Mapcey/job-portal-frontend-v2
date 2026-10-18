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
        <div className="employer-profile-tab-content">
          {/* section */}
          <div className="emp-create-ac-form-section">
            <div className="emp-fs-profile-image-container">
              <Box className="emp-profile-avatar-wrapper">
                <Avatar
                  className="fs-profile-image"
                  alt="Company profile"
                  src={imageSrc}
                  sx={{ width: 120, height: 120 }}
                />

                <IconButton
                  className="emp-profile-image-edit-button"
                  aria-label="Edit profile picture"
                  onClick={() => setEditImageOpen(true)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </div>

            <EditEmployerProfileImage
              open={editImageOpen}
              employerId={employerID}
              currentImage={imageSrc}
              onClose={() => setEditImageOpen(false)}
              onImageUpdated={(imageUrl) => {
                setImageSrc(imageUrl);
              }}
            />
            <div className="emp-fs-text-inputs-1">
              <TextField
                label="Company name"
                disabled
                value={user?.CompanyName || ""}
                variant="outlined"
                className="text-field-dis"
                size="small"
              />

              <TextField
                label="Head Office Location"
                disabled
                value={user?.Location || ""}
                variant="outlined"
                className="text-field-dis"
                size="small"
              />
            </div>
            <div className="emp-fs-text-inputs-1">
              <TextField
                label="Phone number"
                disabled
                value={user?.ContactNo || ""}
                variant="outlined"
                className="text-field-dis"
                size="small"
              />

              <div>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={BrowsePostJob}
                  sx={{
                    bgcolor: "secondary.main",
                    color: "white",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: "white",
                      boxShadow: 6,
                      scale: 1.1,
                      color: "black",
                    },
                  }}
                >
                  Post a New Job
                </Button>
              </div>
            </div>
          </div>

          <div className="create-ac-form-section">
            <div className="fs-text-inputs-2">
              <TextField
                id="outlined-multiline-static"
                label="Company Overview"
                value={user?.Overview || ""}
                disabled
                multiline
                rows={4}
                className="text-field-dis"
                size="small"
              />
            </div>
          </div>

          {/* section */}
          <div className="create-ac-form-section">
            <div className="fs-text-inputs-2">
              <TextField
                label="Website"
                disabled
                // value={user?.Website || ""}
                variant="outlined"
                className="text-field-dis"
                size="small"
              />
            </div>
          </div>

          {/* section */}
          <div>
            <Box
              className="seeker-video-container"
              sx={{
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                color="secondary.main"
                mt={2}
                gutterBottom
              >
                Cover Video
              </Typography>

              {loadingVideo ? (
                <CircularProgress size={30} />
              ) : videoUrl ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                  }}
                >
                  <video
                    controls
                    width="100%"
                    style={{
                      maxWidth: 600,
                      borderRadius: 8,
                    }}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, fontStyle: "italic" }}
                >
                  No video uploaded
                </Typography>
              )}
            </Box>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              fullWidth={false}
              variant="contained"
              onClick={BrowseEditProfile}
              startIcon={<EditIcon />} // icon on the left of text
              sx={{
                bgcolor: "secondary.main",
                color: "white",
                width: "150px",
              }}
            >
              Edit profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerProfileTab;
