import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Box, Typography, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import Autocomplete from "@mui/material/Autocomplete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Chip from "@mui/material/Chip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const options = ["Option 1", "Option 2", "Option 2"];

const Input = styled("input")({
  display: "none",
});

const FormSection_1 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState("/icons/account.svg");

  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const [skills, setSkills] = useState<string[]>([]);

  const [images, setImages] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages((prev) => [...prev, ...fileArray]);
    }
  };

  const handleRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="create-ac-form-container">
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

            <IconButton
              className="upload-btn"
              size="large"
              onClick={handleClick}
              aria-label="show 17 new notifications"
              sx={{
                marginTop: -5,
                bgcolor: "secondary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "secondary.dark", // or any color you want on hover
                  color: "#fff", // optional hover text/icon color
                },
              }}
            >
              <BackupIcon />
            </IconButton>
          </Box>

          <input
            title="upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="fs-text-inputs-1">
          <TextField
            label="Your name"
            variant="outlined"
            placeholder="Add your full name"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="Home address"
            variant="outlined"
            placeholder="Add your home address"
            className="text-input-1"
            size="small"
          />
        </div>
        <div className="fs-text-inputs-1">
          <TextField
            label="Phone number"
            variant="outlined"
            placeholder="Add a valid phone number"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="Email"
            variant="outlined"
            placeholder="Add your email address"
            className="text-input-1"
            size="small"
          />
        </div>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Education level" />
            )}
          />

          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Language expertise" />
            )}
          />

          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Age range" />
            )}
          />
        </div>
        <div className="fs-text-inputs-2">
          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Professional experience" />
            )}
          />

          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Preferred salary range" />
            )}
          />

          <Autocomplete
            size="small"
            className="text-input-1"
            value={value}
            onChange={(event: any, newValue: string | null) => {
              console.log(event);
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(event);
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => <TextField {...params} label="Job type" />}
          />
        </div>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <TextField
            id="outlined-multiline-static"
            label="Professional summary"
            placeholder="add a detailed summery of yor experience."
            multiline
            rows={4}
            className="text-input-1"
            size="small"
          />
        </div>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <Typography mt={2} variant="h5" color="secondary.main">
            Intro Video
          </Typography>

          <Box className="form-area">
            <div className="form-area-content">
              <h4>Impress employers and Stand out !</h4>
              <PlayCircleIcon />
              <Button
                variant="contained"
                color="primary"
                className="search-button"
                sx={{
                  borderRadius: 2,
                  padding: "10px 50px",
                }}
              >
                Upgrade
              </Button>
            </div>
          </Box>
        </div>
        <div className="fs-text-inputs-2">
          <Typography mt={2} variant="h5" color="secondary.main">
            Images
          </Typography>

          <label htmlFor="upload-button">
            <Input
              accept="image/*"
              id="upload-button"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
            >
              Upload Images
            </Button>
          </label>

          {/* Image preview grid */}
          <Grid container spacing={2} mt={2}>
            {images.map((file, index) => (
              <Grid key={index}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid #ccc",
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`upload-${index}`}
                    style={{ width: "100%", height: 100, objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => handleRemove(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                    }}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Career History</h3>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-1">
          <TextField
            label="Company name"
            variant="outlined"
            placeholder="Add your full name"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="From"
            variant="outlined"
            placeholder="Add your home address"
            className="text-input-1"
            size="small"
          />
        </div>
        <div className="fs-text-inputs-1">
          <TextField
            label="Title"
            variant="outlined"
            placeholder="Add a valid phone number"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="To"
            variant="outlined"
            placeholder="Add your email address"
            className="text-input-1"
            size="small"
          />
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Description</h3>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <TextField
            id="outlined-multiline-static"
            label="Professional summary"
            placeholder="add a detailed summery of yor experience."
            multiline
            rows={4}
            className="text-input-1"
            size="small"
          />
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <Button
          variant="contained"
          color="secondary"
          className="create-ac-form-button-2"
          sx={{
            borderRadius: 2,
            padding: "10px 80px",
          }}
        >
          Add
        </Button>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <Autocomplete
            className="text-input-1"
            multiple
            freeSolo
            options={[]} // No predefined options, user can type freely
            value={skills}
            onChange={(event, newValue) => {
              console.log(event);
              setSkills(newValue);
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Add Skills"
                placeholder="e.g. React, Python, SQL"
              />
            )}
          />
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Education</h3>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-1">
          <TextField
            label="Institution name"
            variant="outlined"
            placeholder="Add your full name"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="From"
            variant="outlined"
            placeholder="Add your home address"
            className="text-input-1"
            size="small"
          />
        </div>
        <div className="fs-text-inputs-1">
          <TextField
            label="Field of study"
            variant="outlined"
            placeholder="Add a valid phone number"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="To"
            variant="outlined"
            placeholder="Add your email address"
            className="text-input-1"
            size="small"
          />
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <Button
          variant="contained"
          color="secondary"
          className="create-ac-form-button-2"
          sx={{
            borderRadius: 2,
            padding: "10px 80px",
          }}
        >
          Add
        </Button>
      </div>

      {/* Social Media & Documents Section */}
      <div className="create-ac-form-section">
        <Typography variant="h6" color="secondary.main" gutterBottom>
          Social Media & Documents
        </Typography>

        <div className="fs-text-inputs-1">
          <TextField
            label="Facebook URL"
            variant="outlined"
            placeholder="https://facebook.com/yourprofile"
            className="text-input-1"
            size="small"
          />
          <TextField
            label="LinkedIn URL"
            variant="outlined"
            placeholder="https://linkedin.com/in/yourprofile"
            className="text-input-1"
            size="small"
          />
        </div>

        <div className="fs-text-inputs-1">
          <TextField
            label="Portfolio / Personal Website"
            variant="outlined"
            placeholder="https://yourwebsite.com"
            className="text-input-1"
            size="small"
            fullWidth
          />
        </div>

        <div className="fs-text-inputs-1">
          <Button
            variant="contained"
            component="label"
            color="secondary"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Upload Documents
            <input type="file" hidden multiple />
          </Button>
          <Typography variant="caption" sx={{ ml: 2, mt: 1 }}>
            (Upload your CV, certificates or any relevant documents. PDF, DOCX,
            PNG)
          </Typography>
        </div>
      </div>

      {/* section bottom */}
      <div className="create-ac-form-section">
        <Button
          variant="contained"
          color="secondary"
          className="search-button"
          sx={{
            borderRadius: 2,
            padding: "10px 50px",
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="create-ac-form-button"
          sx={{
            borderRadius: 2,
            padding: "10px 80px",
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default FormSection_1;
