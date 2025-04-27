import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Box, Grid, TextareaAutosize } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"; // Or BackupIcon
import AddIcon from '@mui/icons-material/Add';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Typography from "@mui/material/Typography";

import "../EmployerAccountForm.css"; // Import your CSS file
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

const MAX_OVERVIEW_CHARS = 2000;

const EmployerAccountForm = () => {
  const logoInputRef = useRef < HTMLInputElement > (null);
  const videoInputRef = useRef < HTMLInputElement > (null);
  const imagesInputRef = useRef < HTMLInputElement > (null);

  const [logoSrc, setLogoSrc] = useState(""); // Start empty or with a placeholder icon path
  const [overviewText, setOverviewText] = useState("");

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setLogoSrc(imageUrl);
      // TODO: Add logic to upload the file
    } else {
       // Handle error: Not an image file
       console.error("Please select a valid image file (JPG, PNG).");
    }
  };

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  // Placeholder handlers for video/image uploads - implement actual logic
  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };
   const handleImagesClick = () => {
    imagesInputRef.current?.click();
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
     if (file && file.type === "video/mp4") {
        console.log("Video file selected:", file.name);
        // TODO: Add logic to upload the file and maybe show preview/name
     } else {
        console.error("Please select a valid MP4 file.");
     }
  };

   const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        console.log("Image files selected:", files);
         // TODO: Add logic to upload files and show previews
    }
  };


  return (
    <div className="employer-account-form">
      <Header_2 />
      <Breadcrumb
          title="Profile > Create New Account"
          description="Create a new account to access all features and services. Create a new account to access all features and services."
          backgroundImage="/imgs/backgrounds/bg-1.jpg"
        />
      {/* --- Section 1: Logo and Basic Info --- */}
      <Grid container spacing={4} className="form-section">
        <Grid container item xs={12} md={2} className="logo-upload-container">
          <Box position="relative" display="flex" flexDirection="column" alignItems="center">
             <Avatar
                className="company-logo-avatar"
                alt="Company Logo"
                src={logoSrc || '/icons/default-company.svg'} // Provide a default icon path
                sx={{ width: 100, height: 100, mb: 1 }}
                variant="rounded" // Use rounded variant for square-ish look
              />
            <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<AddAPhotoIcon />}
                onClick={handleLogoClick}
                className="upload-button"
            >
                {logoSrc ? 'Change Logo' : 'Add Logo'}
            </Button>
            <Typography variant="caption" display="block" mt={1} sx={{color: 'var(--color-text-light)'}}>
              (JPG, PNG/ max. 500x500 px)
            </Typography>
             <input
              title="Upload Company Logo"
              type="file"
              accept="image/jpeg, image/png"
              ref={logoInputRef}
              onChange={handleLogoChange}
              style={{ display: "none" }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
            <label htmlFor="company-name" className="form-label">Company Name</label>
            <TextField
                id="company-name"
                variant="filled"
                placeholder="Add a business name"
                fullWidth
                className="form-input"
                size="small"
                InputProps={{ disableUnderline: true }}
            />
            <label htmlFor="office-location" className="form-label">Head Office Location</label>
             <TextField
                id="office-location"
                variant="filled"
                placeholder="Add office address"
                fullWidth
                className="form-input"
                size="small"
                 InputProps={{ disableUnderline: true }}
             />
        </Grid>

         <Grid item xs={12} md={5}>
             <label htmlFor="phone-number" className="form-label">Phone Number</label>
             <TextField
                id="phone-number"
                variant="filled"
                placeholder="Add a valid phone number"
                fullWidth
                type="tel"
                className="form-input"
                size="small"
                 InputProps={{ disableUnderline: true }}
             />
         </Grid>
      </Grid>

      {/* --- Section 2: Company Overview --- */}
      <div className="form-section">
          <label htmlFor="company-overview" className="form-label">Company Overview</label>
          <Box sx={{ position: 'relative' }}>
            <TextareaAutosize
                id="company-overview"
                minRows={6}
                placeholder="Add a detailed summary of your company, achievements, certifications, industry expertise, etc."
                maxLength={MAX_OVERVIEW_CHARS}
                className="form-textarea"
                value={overviewText}
                onChange={(e) => setOverviewText(e.target.value)}
                style={{ width: '100%', resize: 'vertical' }} // Ensure it fills width
            />
             <Typography
                variant="caption"
                sx={{
                    position: 'absolute',
                    bottom: 5,
                    right: 10,
                    color: 'var(--color-text-light)'
                }}
                >
                 {`${overviewText.length}/${MAX_OVERVIEW_CHARS} characters`}
            </Typography>
         </Box>
      </div>

       {/* --- Section 3: Cover Video & Images --- */}
        <Grid container spacing={4} className="form-section">
            <Grid item xs={12} md={6}>
                 <label className="form-label">Cover Video</label>
                 <Box className="upload-box video-upload-box" onClick={handleVideoClick}>
                     <PlayCircleOutlineIcon sx={{ fontSize: 60, color: 'var(--color-primary)' }}/>
                     <Typography variant="body2" sx={{mt: 1, color: 'var(--color-text-light)'}}>
                         Add an introduction video for your company
                     </Typography>
                     <Typography variant="caption" display="block" mt={2} sx={{color: 'var(--color-text-light)'}}>
                         (MP4 / max. 60MB)
                     </Typography>
                 </Box>
                 <input
                    title="Upload Cover Video"
                    type="file"
                    accept="video/mp4"
                    ref={videoInputRef}
                    onChange={handleVideoChange}
                    style={{ display: "none" }}
                />
            </Grid>
             <Grid item xs={12} md={6}>
                 <label className="form-label">Images</label>
                 <Typography variant="body2" sx={{ color: 'var(--color-text-light)', mb: 1}}>
                     Add some images of your company workplace, culture, etc.
                 </Typography>
                 <Grid container spacing={2} className="image-upload-grid">
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={4} key={index}>
                            <Box className="upload-box image-upload-box" onClick={handleImagesClick}>
                                <AddIcon sx={{ fontSize: 30, color: 'var(--color-primary)' }}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <input
                    title="Upload Company Images"
                    type="file"
                    accept="image/*"
                    multiple // Allow multiple file selection
                    ref={imagesInputRef}
                    onChange={handleImagesChange}
                    style={{ display: "none" }}
                 />
            </Grid>
        </Grid>

      {/* --- Section 4: Add Editors & Upgrade --- */}
       <Grid container spacing={4} className="form-section">
            <Grid item xs={12} md={6}>
                <label className="form-label">Add Editors</label>
                <TextField
                    variant="filled"
                    placeholder="Add email address"
                    fullWidth
                    type="email"
                    className="form-input"
                    size="small"
                    InputProps={{ disableUnderline: true }}
                    sx={{ mb: 1.5 }}
                />
                <TextField
                    variant="filled"
                    placeholder="Create password"
                    fullWidth
                    type="password"
                    className="form-input"
                    size="small"
                     InputProps={{ disableUnderline: true }}
                    sx={{ mb: 1.5 }}
                />
                 <TextField
                    variant="filled"
                    placeholder="Confirm password"
                    fullWidth
                    type="password"
                    className="form-input"
                    size="small"
                    InputProps={{ disableUnderline: true }}
                    sx={{ mb: 2 }}
                 />
                 <Button
                    variant="contained"
                    color="primary"
                    className="form-button"
                 >
                    Add
                </Button>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Box className="upgrade-box">
                     <Typography variant="h6" gutterBottom>Need More Editors?</Typography>
                     <Button
                         variant="contained"
                         color="primary"
                         className="form-button"
                     >
                         Upgrade
                     </Button>
                 </Box>
            </Grid>
       </Grid>


      {/* --- Section 5: Action Buttons --- */}
      <Box className="form-actions">
        <Button
          variant="contained"
          color="secondary" // Using secondary color from variables
          className="form-button form-button-save"
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary" // Using secondary color from variables
          className="form-button form-button-create"
        >
          Create Account
        </Button>
      </Box>
    </div>
  );
};

export default EmployerAccountForm;