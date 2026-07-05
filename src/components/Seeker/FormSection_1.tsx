import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { updateSeeker } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { currencies } from "../../data/currencies";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelance",
  "Remote",
];
const jobModeOptions = [
  { value: "On-site", label: "On-site" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
];

const CreateSeeker: React.FC = () => {
  const { userInfo } = useAuth(); // ✅ hook inside component
  const [seekerID, setSeekerID] = useState<number>(0);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    ContactNo: "",
    LocationX: 0,
    LocationY: 0,
    Address: "",
    Email: "",
    Currency: "",
    ProfessionalExperience: 0,
    DateOfBirth: "",
    JobType: "",
    JobType2: "",
    SocialLinks: "",
    Summary: "",
    IsSubscribed: false, // Add default value for IsSubscribed
  });

  useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // set your LocationX and LocationY with latitude/longitude
        setForm((prev) => ({
          ...prev,
          LocationX: position.coords.latitude, // X = latitude
          LocationY: position.coords.longitude, // Y = longitude
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}, []);

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) setSeekerID(userInfo.UserId);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.Email) {
      setForm((prev) => ({ ...prev, Email: userInfo.Email }));
    }
  }, [userInfo?.Email]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        Email: userInfo?.Email || form.Email,
        Currency: form.Currency || undefined,
        LocationX: Number(form.LocationX || 0),
        LocationY: Number(form.LocationY || 0),
        ProfessionalExperience: Number(form.ProfessionalExperience || 0),
        DateOfBirth: form.DateOfBirth ? new Date(form.DateOfBirth) : undefined,
        IsSubscribed: Boolean(form.IsSubscribed),
      };

      await updateSeeker(seekerID, payload);
      setSuccessMessage("Profile updated successfully! Please login again.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      alert("Failed to update seeker");
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 4,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Typography variant="h5" mb={3} fontWeight={600}>
        Create Profile
      </Typography>

      {/* First Name / Last Name */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="First Name"
          placeholder="Enter first name"
          value={form.FirstName}
          onChange={(e) => handleChange("FirstName", e.target.value)}
        />
        <TextField
          fullWidth
          label="Last Name"
          placeholder="Enter last name"
          value={form.LastName}
          onChange={(e) => handleChange("LastName", e.target.value)}
        />
      </Box>

      {/* Contact No / Email */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Contact No"
          placeholder="Enter contact number"
          value={form.ContactNo}
          onChange={(e) => handleChange("ContactNo", e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter email"
          value={form.Email || userInfo?.Email || ""}
          disabled
        />
      </Box>

      {/* Address */}
      <TextField
        fullWidth
        label="Address"
        placeholder="Enter address"
        value={form.Address}
        onChange={(e) => handleChange("Address", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* LocationX / LocationY */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Location X"
          placeholder="Enter location X"
          value={form.LocationX}
          onChange={(e) => handleChange("LocationX", Number(e.target.value))}
        />
        <TextField
          fullWidth
          type="number"
          label="Location Y"
          placeholder="Enter location Y"
          value={form.LocationY}
          onChange={(e) => handleChange("LocationY", Number(e.target.value))}
        />
      </Box>

      {/* Professional Experience /*/}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          type="number"
          label="Professional Experience"
          placeholder="Enter years of experience"
          value={form.ProfessionalExperience}
          onChange={(e) =>
            handleChange("ProfessionalExperience", Number(e.target.value))
          }
        />
      </Box>

      {/* Date of Birth */}
      <TextField
        fullWidth
        type="date"
        label="Date of Birth"
        InputLabelProps={{ shrink: true }}
        value={form.DateOfBirth}
        onChange={(e) => handleChange("DateOfBirth", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Currency */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          value={form.Currency || ""}
          name="Currency"
          label="Currency"
          onChange={(e) => handleChange("Currency", e.target.value)}
        >
          {currencies.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.code} - {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Social Links */}
      <TextField
        fullWidth
        label="Social Links"
        placeholder="Enter LinkedIn, GitHub, etc."
        value={form.SocialLinks}
        onChange={(e) => handleChange("SocialLinks", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Summary */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Summary"
        placeholder="Write a short summary about yourself"
        value={form.Summary}
        onChange={(e) => handleChange("Summary", e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Create Profile
      </Button>
    </Box>
  );
};

export default CreateSeeker;
