import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  TextField,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { Backup, PlayCircle, UploadFile, Delete } from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import { EMPLOYER_DATA } from "../../types/users";
import { putEmployerData } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";

const Input = styled("input")({
  display: "none",
});

const FormSection_1 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState("/icons/account.svg");
  const [images, setImages] = useState<File[]>([]);
  const { userInfo, login, token } = useAuth();
  const [employerID, setEmployerID] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setEmployerID(userInfo.EmployerId);
      console.log(userInfo.EmployerId);
    }
  }, [userInfo]);

  const [formData, setFormData] = useState<EMPLOYER_DATA>({
    EmployerId: 0,
    FirebaseUID: "",
    CompanyName: "",
    ContactNo: "",
    WebSite: "",
    Location: "",
    LinkedIn: "",
    Overview: "",
    IsSub: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(userInfo.EmployerId);

    e.preventDefault();
    try {
      const response = await putEmployerData(employerID, formData);
      console.log("Success:", response);
      navigate("/employer/profile/");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

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
    <form className="create-ac-form-container" onSubmit={handleSubmit}>
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
              <Backup />
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
            label="Company Name"
            variant="outlined"
            placeholder="Add a business name"
            className="text-input-1"
            size="small"
            required
            onChange={(e) =>
              setFormData({ ...formData, CompanyName: e.target.value })
            }
          />

          <TextField
            label="Head Office Location"
            variant="outlined"
            placeholder="Add office address"
            className="text-input-1"
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, Location: e.target.value })
            }
          />
        </div>
        <div className="fs-text-inputs-1">
          <TextField
            label="Phone number"
            variant="outlined"
            placeholder="Add a valid phone number"
            className="text-input-1"
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, ContactNo: e.target.value })
            }
          />
        </div>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <TextField
            id="outlined-multiline-static"
            label="Company Overview"
            placeholder="add a detailed summery of yor experience."
            multiline
            rows={4}
            className="text-input-1"
            size="small"
            onChange={(e) =>
              setFormData({ ...formData, Overview: e.target.value })
            }
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
              <PlayCircle />
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
              startIcon={<UploadFile />}
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
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div className="create-ac-form-section-2">
        <h3 style={{ marginBottom: "0", paddingTop: "20" }}>Add Editors</h3>
      </div>

      {/* section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-1">
          <TextField
            label="Add Email Address"
            variant="outlined"
            placeholder="Add your full name"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="Create Password"
            variant="outlined"
            placeholder="Add your home address"
            className="text-input-1"
            size="small"
          />

          <TextField
            label="Conform Password"
            variant="outlined"
            placeholder="Add your home address"
            className="text-input-1"
            size="small"
          />
        </div>
        <div className="fs-text-inputs-1">
          <Box className="form-area-1">
            <div className="form-area-content">
              <h4>Need More Editors?</h4>
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

      {/* section bottom */}
      <div className="create-ac-form-section">
        {/* <Button
          variant="contained"
          color="secondary"
          className="search-button"
          sx={{
            borderRadius: 2,
            padding: "10px 50px",
          }}-
        >
          Save
        </Button> */}
        <Button
          variant="contained"
          color="secondary"
          className="create-ac-form-button"
          sx={{
            borderRadius: 2,
            padding: "10px 80px",
          }}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSection_1;
