import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { updateSeeker } from "../../services/APIs/APIs"; // adjust path
import { useAuth } from "../../context/AuthContext";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelance",
  "Remote",
];

const CreateSeeker: React.FC = () => {
  const { userInfo } = useAuth(); // ✅ hook inside component
  const [seekerID, setSeekerID] = useState<number>(0);
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    ContactNo: "",
    LocationX: 0,
    LocationY: 0,
    Address: "",
    Email: "",
    ProfessionalExperience: 0,
    DateOfBirth: "",
    Salary: 0,
    JobType: "",
    JobType2: "",
    SocialLinks: "",
    Summary: "",
    IsSubscribed: false, // Add default value for IsSubscribed
  });

  useEffect(() => {
      if (userInfo && "UserId" in userInfo) setSeekerID(userInfo.UserId);
    }, [userInfo]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // For updateSeeker, you need a SeekerId. Replace 1 with actual ID if available.
      await updateSeeker(seekerID, { ...form, DateOfBirth: new Date(form.DateOfBirth) });
      alert("Seeker profile updated successfully!");
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
          value={userInfo.Email}
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

      {/* Professional Experience / Salary */}
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
        <TextField
          fullWidth
          type="number"
          label="Salary"
          placeholder="Enter expected salary"
          value={form.Salary}
          onChange={(e) => handleChange("Salary", Number(e.target.value))}
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

      {/* Job Type / Job Type 2 */}
      <Box display="flex" gap={2} mb={2}>
        <Autocomplete
          fullWidth
          options={jobTypes}
          value={form.JobType}
          onChange={(_, newValue) => handleChange("JobType", newValue || "")}
          renderInput={(params) => (
            <TextField {...params} label="Job Type" placeholder="Select job type" />
          )}
        />
        <Autocomplete
          fullWidth
          options={jobTypes}
          value={form.JobType2}
          onChange={(_, newValue) => handleChange("JobType2", newValue || "")}
          renderInput={(params) => (
            <TextField {...params} label="Job Type 2" placeholder="Select job type 2" />
          )}
        />
      </Box>

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
