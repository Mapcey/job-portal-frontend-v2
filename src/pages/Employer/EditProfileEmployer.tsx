import React, { useEffect, useRef, useState } from "react";
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

import { EMPLOYER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationsProvider";

import {
  getEmployerData,
  putEmployerData,
  getEmployerFiles,
  uploadNewEmployerFiles,
  updateEmployerFile,
  deleteEmployerFiles,
} from "../../services/APIs/APIs";

const EditProfileEmployer = () => {
  const [formData, setFormData] = useState<EMPLOYER_DATA>({
    EmployerId: 0,
    FirebaseUID: "",
    CompanyName: "",
    ContactNo: "",
    Website: "",
    Location: "",
    LinkedIn: "",
    Overview: "",
    IsSub: false,
  });

  // Profile image
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] =
    useState<string>("/icons/account.svg");
  const [existingFileId, setExistingFileId] = useState<number | null>(null);

  // Company video
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [existingVideoId, setExistingVideoId] = useState<number | null>(null);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Get Employer ID from logged-in user
  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setFormData((prev) => ({
        ...prev,
        EmployerId: userInfo.EmployerId,
      }));
    }
  }, [userInfo]);

  // Fetch employer data and files
  useEffect(() => {
    if (!formData.EmployerId) return;

    const fetchData = async () => {
      try {
        const data = await getEmployerData(formData.EmployerId.toString());

        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch employer data:", error);
      }
    };

    const fetchEmployerFiles = async () => {
      try {
        const files = await getEmployerFiles(formData.EmployerId);

        // Profile image
        const imageFile = files.find(
          (file: any) => file.FileCategory === "FileType.image",
        );

        if (imageFile) {
          setProfileImageUrl(imageFile.FileUrl);
          setExistingFileId(imageFile.Id);
        }

        // Company video
        const videoFile = files.find(
          (file: any) => file.FileCategory === "FileType.video",
        );

        if (videoFile) {
          setVideoUrl(videoFile.FileUrl);
          setExistingVideoId(videoFile.Id);
        }
      } catch (error) {
        console.error("Failed to fetch employer files:", error);
      }
    };

    fetchData();
    fetchEmployerFiles();
  }, [formData.EmployerId]);

  // Select profile image
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImageFile(file);
    setProfileImageUrl(URL.createObjectURL(file));
  };

  // Select company video
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  // Open image file selector
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Open video file selector
  const handleUploadVideoClick = () => {
    videoInputRef.current?.click();
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete profile image
  const handleDeleteImage = async () => {
    if (!formData.EmployerId || !existingFileId) return;

    try {
      await deleteEmployerFiles(formData.EmployerId, existingFileId);

      setProfileImageUrl("/icons/account.svg");
      setProfileImageFile(null);
      setExistingFileId(null);

      notify("Profile image deleted", "success");
    } catch (error) {
      console.error("Failed to delete image:", error);
      notify("Failed to delete image", "error");
    }
  };

  // Delete company video
  const handleDeleteVideo = async () => {
    if (!formData.EmployerId || !existingVideoId) return;

    try {
      await deleteEmployerFiles(formData.EmployerId, existingVideoId);

      setVideoUrl("");
      setVideoFile(null);
      setExistingVideoId(null);

      notify("Video deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete video:", error);
      notify("Failed to delete video", "error");
    }
  };

  // Save profile
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.EmployerId) {
      notify("Employer ID is missing", "error");
      return;
    }

    setUploading(true);

    try {
      // 1. Update employer information
      await putEmployerData(formData.EmployerId, formData);

      // 2. Upload/update profile image
      if (profileImageFile) {
        const imageFormData = new FormData();

        imageFormData.append("file", profileImageFile);
        imageFormData.append("file_type", "image");

        if (existingFileId) {
          await updateEmployerFile(
            formData.EmployerId,
            existingFileId,
            imageFormData,
          );
        } else {
          await uploadNewEmployerFiles(formData.EmployerId, imageFormData);
        }
      }

      // 3. Upload/update company video
      if (videoFile) {
        const videoFormData = new FormData();

        videoFormData.append("file", videoFile);
        videoFormData.append("file_type", "video");

        if (existingVideoId) {
          await updateEmployerFile(
            formData.EmployerId,
            existingVideoId,
            videoFormData,
          );
        } else {
          await uploadNewEmployerFiles(formData.EmployerId, videoFormData);
        }
      }

      notify("Profile updated successfully", "success");

      navigate("/employer/profile");
    } catch (error: any) {
      console.error("Failed to update profile:", error);

      if (error.response) {
        console.error("Status:", error.response.status);

        console.error("Response:", error.response.data);
      }

      notify("Failed to update profile", "error");
    } finally {
      setUploading(false);
    }
  };

  // Cancel editing
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
        {/* ? exising profile image */}
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
              label="Website"
              name="Website"
              value={formData.Website}
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
