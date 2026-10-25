import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";

import {
  getEmployerFiles,
  uploadNewEmployerFiles,
  updateEmployerFile,
} from "../../services/APIs/APIs";

import { useNotification } from "../../context/NotificationsProvider";

interface EditEmployerProfileImageProps {
  open: boolean;
  employerId: number;
  currentImage: string;
  onClose: () => void;
  onImageUpdated: (imageUrl: string) => void;
}

const EditEmployerProfileImage = ({
  open,
  employerId,
  currentImage,
  onClose,
  onImageUpdated,
}: EditEmployerProfileImageProps) => {
  const {
    userInfo,
    //  userRole
  } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(currentImage);
  const [saving, setSaving] = useState(false);

  const { notify } = useNotification();

  useEffect(() => {
    if (open) {
      setSelectedFile(null);
      setPreview(currentImage);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, currentImage]);

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      notify("Please select a valid image", "error");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      notify("Image size must be 5 MB or less", "error");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleClose = () => {
    if (saving) return;

    setSelectedFile(null);
    onClose();
  };

  //   const clearCatch = () => {
  //     let userId = userInfo?.UserId;

  //     userId = userInfo?.EmployerId;

  //     const cacheKey = `profileImage_employer_${userId}`;
  //     console.log(userId);

  //     localStorage.removeItem(cacheKey);
  //   };

  const handleSave = async () => {
    console.log("save image");

    let userId: undefined;
    userId = userInfo?.EmployerId;
    const cacheKey = `profileImage_employer_${userId}`;
    console.log(userId);

    localStorage.removeItem(cacheKey);

    if (!selectedFile || !employerId) {
      notify("Please select an image", "error");
      return;
    }

    setSaving(true);

    try {
      // Find the current profile image, if one exists.
      const files = await getEmployerFiles(employerId);

      const existingImage = files.find(
        (file: any) => file.FileCategory === "FileType.image",
      );

      // Prepare the image upload.
      const imageFormData = new FormData();
      imageFormData.append("file", selectedFile);
      imageFormData.append("file_type", "image");

      // Update the existing image or upload a new one.
      if (existingImage) {
        await updateEmployerFile(employerId, existingImage.Id, imageFormData);
      } else {
        await uploadNewEmployerFiles(employerId, imageFormData);
      }

      // Fetch the saved image URL from the server.
      const updatedFiles = await getEmployerFiles(employerId);

      const updatedImage = updatedFiles.find(
        (file: any) => file.FileCategory === "FileType.image",
      );

      if (!updatedImage?.FileUrl) {
        throw new Error(
          "Upload completed, but the updated image URL could not be retrieved.",
        );
      }

      // Update the parent profile and close the popup.
      onImageUpdated(updatedImage.FileUrl);
      setSelectedFile(null);

      notify("Profile picture updated successfully", "success");
      onClose();
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      notify("Failed to update profile picture. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 600,
        }}
      >
        Edit profile picture
        <IconButton
          onClick={handleClose}
          disabled={saving}
          aria-label="Close dialog"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          py={2}
        >
          <Avatar
            src={preview || undefined}
            alt="Profile image preview"
            sx={{
              width: 150,
              height: 150,
              bgcolor: "grey.100",
              color: "grey.500",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <PhotoCameraOutlinedIcon sx={{ fontSize: 48 }} />
          </Avatar>

          <Typography variant="body2" color="text.secondary">
            Choose a clear company profile picture.
          </Typography>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <Button
            variant="outlined"
            startIcon={<PhotoCameraOutlinedIcon />}
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
          >
            Choose image
          </Button>

          {selectedFile && (
            <Box display="flex" alignItems="center" gap={1} maxWidth="100%">
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedFile.name}
              </Typography>

              <IconButton
                size="small"
                aria-label="Remove selected image"
                disabled={saving}
                onClick={() => {
                  setSelectedFile(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          <Typography variant="caption" color="text.secondary">
            Maximum image size: 5 MB.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
        <Button onClick={handleClose} disabled={saving} color="inherit">
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!selectedFile || saving}
        >
          {saving ? "Uploading..." : "Save picture"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployerProfileImage;
