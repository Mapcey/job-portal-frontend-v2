import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import Autocomplete from "@mui/material/Autocomplete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const options = ["Option 1", "Option 2", "Option 2"];

const FormSection_1 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState("/icons/account.svg");

  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");

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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
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
          <h3 style={{ marginBottom: "0" }}>Intro Video</h3>
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
          <h3 style={{ marginBottom: "0" }}>Images</h3>
          <Box className="form-area">upload here</Box>
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Education</h3>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
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

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Education</h3>
      </div>

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
