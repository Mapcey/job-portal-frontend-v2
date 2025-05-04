import React, { useRef, useState } from "react";

import {
  Typography,
  Box,
  Chip,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";

const EmployerProfileTab = () => {
  const photos = [
    "/imgs/grid/design.jpg",
    "/imgs/grid/developing.jpg",
    "/imgs/grid/education.jpg",
    "/imgs/grid/finance.jpg",
    "/imgs/grid/health.jpg",
    "/imgs/grid/legal.jpg",
  ];

  const [imageSrc, setImageSrc] = useState("/imgs/companies/c1.png");
  return (
    <div className="employer-profile-tab-container">
      <div className="employer-profile-tab-content">
        {/* section */}
        <div className="create-ac-form-section">
          <div className="fs-profile-image-container">
            <Box position="relative" display="inline-block">
              <Avatar
                className="fs-profile-image"
                alt="Profile"
                src={imageSrc}
                sx={{ width: 120, height: 120 }}
              />
            </Box>
          </div>
          <div className="fs-text-inputs-1">
            <TextField
              label="Company name"
              disabled
              value={"John Keells Holdings"}
              variant="outlined"
              className="text-input-1"
              size="small"
            />

            <TextField
              label="Head Office Location"
              disabled
              value={"Colombo"}
              variant="outlined"
              className="text-input-1"
              size="small"
            />
          </div>
          <div className="fs-text-inputs-1">
            <TextField
              label="Phone number"
              disabled
              value={"045 22 111 2222"}
              variant="outlined"
              className="text-input-1"
              size="small"
            />

            <div>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "secondary.main",
                  color: "white",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "secondary.dark",
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

        {/* section */}
        <div className="create-ac-form-section">
          <div className="fs-text-inputs-2">
            <TextField
              id="outlined-multiline-static"
              label="Company Overview"
              value={"add about company."}
              disabled
              multiline
              rows={4}
              className="text-input-1"
              size="small"
            />
          </div>
        </div>

        {/* section */}
        <div className="create-ac-form-section">
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
                <Grid item xs={12} sm={6} md={6} key={index}>
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
      </div>
    </div>
  );
};

export default EmployerProfileTab;
