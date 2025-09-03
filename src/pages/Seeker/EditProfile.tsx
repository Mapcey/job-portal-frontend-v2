import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Chip,
  Autocomplete,
} from "@mui/material";

const SeekerEditPage = () => {
  const [name, setName] = useState("Isuru Prasad");
  const [position, setPosition] = useState("Software Engineer");
  const [phone, setPhone] = useState("011 22334455");
  const [email, setEmail] = useState("isuru@email.com");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API to save the data
    console.log({ name, position, phone, email, summary, skills });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Professional Summary"
          multiline
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Autocomplete
          multiple
          freeSolo
          value={skills}
          onChange={(_, newValue) => setSkills(newValue)}
          options={[]}
          renderTags={(value: string[], getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={option}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Skills" variant="outlined" />
          )}
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default SeekerEditPage;
