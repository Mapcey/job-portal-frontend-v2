import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { Backup } from "@mui/icons-material";

import { EMPLOYER_DATA } from "../../types/users";
import { putEmployerData } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationsProvider";
import { uploadNewEmployerFiles } from "../../services/APIs/APIs";

const FormSection_1 = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState("/icons/account.svg");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const { userInfo } = useAuth();
  const [employerID, setEmployerID] = useState(0);
  const navigate = useNavigate();
  const { notify } = useNotification();

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

  // ---------------------- VALIDATION ----------------------
  const validateImage = (file: File) => {
    const validFormats = ["image/jpeg", "image/png", "image/jpg"];
    if (!validFormats.includes(file.type)) return "Image must be JPG or PNG.";
    if (file.size > 5 * 1024 * 1024) return "Image must be ≤ 5 MB.";
    return null;
  };

  // ---------------------- FILE HANDLERS ----------------------
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) {
      notify(error, "error");
      return;
    }

    setProfileImage(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // ---------------------- SUBMIT ----------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!employerID) {
        notify("Employer ID not found", "error");
        return;
      }

      // If profile image selected, upload it via backend API
      if (profileImage) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("file_type", "image");

        try {
          const res = await uploadNewEmployerFiles(employerID, formData);
          console.log("File uploaded successfully:", res);
        } catch (error) {
          console.error("Error uploading image:", error);
          notify("Image upload failed", "error");
        }
      }

      // Then update employer details
      const response = await putEmployerData(employerID, formData);
      console.log("Profile updated:", response);

      notify("Profile updated successfully", "success");
      navigate("/employer/profile/");
    } catch (err) {
      console.error("Error updating employer:", err);
      notify("Error updating employer profile", "error");
    }
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

      {/* section bottom */}
      <div className="create-ac-form-section">
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
