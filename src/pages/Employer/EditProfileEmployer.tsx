import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Box,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Backup, Delete } from "@mui/icons-material";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getEmployerData, putEmployerData } from "../../services/APIs/APIs";
import { EMPLOYER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationsProvider";

import { getEmployerFiles } from "../../services/APIs/APIs";
import { uploadNewEmployerFiles } from "../../services/APIs/APIs";
import { updateEmployerFile } from "../../services/APIs/APIs";
import { deleteEmployerFiles } from "../../services/APIs/APIs";

const EditProfileEmployer = () => {
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

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] =
    useState<string>("/icons/account.svg");
  const [existingFileId, setExistingFileId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video upload states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [existingVideoId, setExistingVideoId] = useState<number | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Set EmployerId from logged-in user
  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setFormData((prev) => ({
        ...prev,
        EmployerId: userInfo.EmployerId,
      }));
    }
  }, [userInfo]);

  // Fetch employer files and profile image
  useEffect(() => {
    const fetchData = async () => {
      if (formData.EmployerId) {
        try {
          const data = await getEmployerData(formData.EmployerId.toString());
          setFormData(data); // pre-fill form with existing data
          console.log("Employer data fetched:", data);
        } catch (error) {
          console.error("Failed to fetch employer data:", error);
        }
      }
    };
    fetchData();

    const fetchEmployerFiles = async () => {
      if (!formData.EmployerId) return;

      try {
        const files = await getEmployerFiles(formData.EmployerId);

        // Image
        const profileFile = files.find(
          (file: any) => file.file_type === "FileType.image"
        );
        if (profileFile) {
          setProfileImageUrl(profileFile.file_url);
          setExistingFileId(profileFile.id);
        }

        // 🎥 Video
        const videoFile = files.find(
          (file: any) => file.file_type === "FileType.video"
        );
        if (videoFile) {
          setVideoUrl(videoFile.file_url);
          setExistingVideoId(videoFile.id);
        }
      } catch (err) {
        console.error("Failed to fetch employer files:", err);
      }
    };
    fetchEmployerFiles();
  }, [formData.EmployerId]);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteImage = async () => {
    if (!existingFileId || !formData.EmployerId) return;

    try {
      await deleteEmployerFiles(formData.EmployerId, existingFileId);
      setProfileImageUrl("/icons/account.svg"); // reset to default avatar
      setExistingFileId(null);
      localStorage.removeItem("profileImage");
      notify("Profile image deleted", "success");
    } catch (err) {
      console.error("Failed to delete image:", err);
      notify("Failed to delete image", "error");
    }
  };

  const handleDeleteVideo = async () => {
    if (!existingVideoId || !formData.EmployerId) return;

    try {
      await deleteEmployerFiles(formData.EmployerId, existingVideoId);
      setVideoUrl("");
      setExistingVideoId(null);
      notify("Video deleted successfully", "success");
    } catch (err) {
      console.error("Failed to delete video:", err);
      notify("Failed to delete video", "error");
    }
  };

  // Save updated data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      // Replace old profile image if a new one is selected
      if (profileImageFile) {
        const formDataFile = new FormData();
        formDataFile.append("file", profileImageFile);
        formDataFile.append("file_type", "image");

        if (existingFileId) {
          // Update existing image
          await updateEmployerFile(
            formData.EmployerId,
            existingFileId,
            formDataFile
          );
        } else {
          // No existing file, upload new
          await uploadNewEmployerFiles(formData.EmployerId, formDataFile);
        }
      }

      if (videoFile) {
        const formDataFile = new FormData();
        formDataFile.append("file", videoFile);
        formDataFile.append("file_type", "video");

        if (existingVideoId) {
          // Update existing image
          await updateEmployerFile(
            formData.EmployerId,
            existingVideoId,
            formDataFile
          );
        } else {
          // No existing file, upload new
          await uploadNewEmployerFiles(formData.EmployerId, formDataFile);
        }
      }

      localStorage.removeItem("profileImage");

      // Update profile details
      await putEmployerData(formData.EmployerId, formData);
      notify("Profile updated successfully", "success");
      navigate("/employer/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      notify("Failed to update profile", "error");
    } finally {
      setUploading(false); // hide overlay
    }
  };

  const handleCancel = () => {
    navigate("/employer/profile");
  };

  return (
    <div className="employer-edit-profile-container">
      {uploading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} thickness={5} sx={{ color: "white" }} />
        </Box>
      )}
      <Header_2 />
      <Breadcrumb
        title="Edit Employer Profile"
        description="Edit Account details"
        backgroundImage="/imgs/backgrounds/bg-1.jpg"
      />
      <Container sx={{ mt: 4, mb: 4 }}>
        <div>
          {/* Profile Image */}
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={profileImageUrl}
              alt="Profile"
              sx={{ width: 120, height: 120, mr: 2 }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUploadClick}
                startIcon={<Backup />}
              >
                Change Photo
              </Button>
              {existingFileId && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteImage}
                  startIcon={<Delete />}
                >
                  Delete Photo
                </Button>
              )}
            </Box>
          </Box>
          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Company Name"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
            <TextField
              fullWidth
              label="Email"
              name="Email"
              value={userInfo.Email}
              size="small"
              className="text-field-1"
              disabled
            />
          </Box>
          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Contact Number"
              name="ContactNo"
              value={formData.ContactNo}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />

            <TextField
              fullWidth
              label="WebSite"
              name="WebSite"
              value={formData.WebSite}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>

          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Location"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />

            <TextField
              fullWidth
              label="LinkedIn"
              name="LinkedIn"
              value={formData.LinkedIn}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>
          <Box gap={2} display={"flex"} flexDirection={"row"}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Overview"
              name="Overview"
              value={formData.Overview}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>

          {/* 🎥 Upload Company Introduction Video */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Company Introduction Video
            </Typography>

            {videoUrl ? (
              <Box mb={2}>
                <video
                  src={videoUrl}
                  width="320"
                  height="180"
                  controls
                  style={{ borderRadius: "8px" }}
                />
              </Box>
            ) : (
              <Typography color="text.secondary">
                No video uploaded yet.
              </Typography>
            )}

            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoSelect}
            />

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadVideoClick}
                startIcon={<Backup />}
              >
                {existingVideoId ? "Replace Video" : "Upload Video"}
              </Button>

              {existingVideoId && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteVideo}
                  startIcon={<Delete />}
                >
                  Delete Video
                </Button>
              )}
            </Box>
          </Box>
        </div>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Edits
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Container>
      <FooterSection_1 />
    </div>
  );
};

export default EditProfileEmployer;
