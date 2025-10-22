import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CircularProgress
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { EMPLOYER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { getEmployerData } from "../../services/APIs/APIs";
import EditIcon from "@mui/icons-material/Edit";
import { getEmployerFiles } from "../../services/APIs/APIs";

const EmployerProfileTab = () => {
  const photos = [
    "/imgs/grid/design.jpg",
    "/imgs/grid/developing.jpg",
    "/imgs/grid/education.jpg",
    "/imgs/grid/finance.jpg",
    "/imgs/grid/health.jpg",
    "/imgs/grid/legal.jpg",
  ];

  const [imageSrc, setImageSrc] = useState("");
  // const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [employerID, setEmployerID] = useState(0);
  const [user, setUser] = useState<EMPLOYER_DATA | null>(null);
  const [loading, setLoading] = useState(true);

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
        (file: any) => file.file_type === "FileType.image"
      );

      if (profileImage && profileImage.file_url) {
        setImageSrc(profileImage.file_url);
      }

      console.log("Employer data:", data);
      console.log("Employer files:", fileData);
    } catch (error) {
      console.error("Failed to fetch employer data:", error);
    } finally {
      setLoading(false);
    }
  };

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
    {loading ?(
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
    ): (
      <div className="employer-profile-tab-content">
        {/* section */}
        <div className="emp-create-ac-form-section">
          <div className="emp-fs-profile-image-container">
            <Box position="relative" display="inline-block">
              <Avatar
                className="fs-profile-image"
                alt="Profile"
                src={imageSrc}
                sx={{ width: 120, height: 120 }}
              />
            </Box>
          </div>
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
              value={user?.WebSite || ""}
              variant="outlined"
              className="text-field-dis"
              size="small"
            />
          </div>
        </div>

        {/* section */}
        <div className="emp-create-ac-form-section">
          <Box className="seeker-video-container" sx={{ marginBottom: 3 }}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              Cover Video
            </Typography>
            <video
              controls
              height={"200px"}
              //   width="100%"
              style={{ borderRadius: "8px" }}
            >
              <source src="/videos/self-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <Box sx={{}}>
            <Typography variant="h6" color="secondary.main" gutterBottom>
              Uploaded Photos
            </Typography>

            <Grid container spacing={2}>
              {photos.slice(0, 6).map((photo, index) => (
                <Grid key={index}>
                  <Card
                    sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}
                  >
                    <CardMedia
                      component="img"
                      image={photo}
                      alt={`Uploaded ${index + 1}`}
                      sx={{ height: 50, objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
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
