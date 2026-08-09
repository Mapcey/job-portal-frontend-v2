import React from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SeekerFilterPanel = ({ filters, setFilters, onClose }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      job_type: "all",
      work_type: "all",
      location: "all",
      min_salary: "",
      max_salary: "",
      experience: "",
      languages: "",
      education: "all",
      skills: "",
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        position: { md: "sticky" },
        top: 90,
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={1} alignItems="center">
        <FilterAltIcon color="primary" />
        <Typography variant="h6" fontWeight={600}>
          Filter Candidates
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Job Type */}
      <Typography variant="subtitle2" fontWeight={600}>
        Job Type
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        name="job_type"
        value={filters.job_type}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="all">All Job Types</MenuItem>
        <MenuItem value="Full-time">Full-time</MenuItem>
        <MenuItem value="Part-time">Part-time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
        <MenuItem value="Internship">Internship</MenuItem>
      </TextField>

      {/* Work Type */}
      <Typography variant="subtitle2" fontWeight={600}>
        Work Type
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        name="work_type"
        value={filters.work_type}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="all">Any</MenuItem>
        <MenuItem value="On-site">On-site</MenuItem>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
      </TextField>

      {/* Location */}
      <Typography variant="subtitle2" fontWeight={600}>
        Location
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Enter location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      {/* Salary */}
      <Typography variant="subtitle2" fontWeight={600}>
        Salary Range
      </Typography>

      <Stack direction="row" spacing={1} mb={2}>
        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="Min"
          name="min_salary"
          value={filters.min_salary}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          size="small"
          type="number"
          placeholder="Max"
          name="max_salary"
          value={filters.max_salary}
          onChange={handleChange}
        />
      </Stack>

      {/* Experience */}
      <Typography variant="subtitle2" fontWeight={600}>
        Minimum Experience
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        name="experience"
        value={filters.experience}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Any</MenuItem>
        <MenuItem value="0">No experience</MenuItem>
        <MenuItem value="1">1+ Years</MenuItem>
        <MenuItem value="2">2+ Years</MenuItem>
        <MenuItem value="3">3+ Years</MenuItem>
        <MenuItem value="5">5+ Years</MenuItem>
        <MenuItem value="10">10+ Years</MenuItem>
      </TextField>

      {/* Education */}
      <Typography variant="subtitle2" fontWeight={600}>
        Education
      </Typography>

      <TextField
        select
        fullWidth
        size="small"
        name="education"
        value={filters.education}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="all">Any Education</MenuItem>
        <MenuItem value="High School">High School</MenuItem>
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="Bachelors">Bachelor's</MenuItem>
        <MenuItem value="Masters">Master's</MenuItem>
        <MenuItem value="PhD">PhD</MenuItem>
      </TextField>

      {/* Languages */}
      <Typography variant="subtitle2" fontWeight={600}>
        Languages
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="English, Spanish"
        name="languages"
        value={filters.languages}
        onChange={handleChange}
        helperText="Separate multiple languages with commas"
        sx={{ mb: 2 }}
      />

      {/* Skills */}
      <Typography variant="subtitle2" fontWeight={600}>
        Skills
      </Typography>

      <TextField
        fullWidth
        size="small"
        placeholder="Python, React, AutoCAD"
        name="skills"
        value={filters.skills}
        onChange={handleChange}
        helperText="Separate multiple skills with commas"
        sx={{ mb: 3 }}
      />

      {/* Actions */}
      <Stack spacing={1}>
        {onClose && (
          <Button variant="contained" fullWidth onClick={onClose}>
            Apply Filters
          </Button>
        )}

        <Button variant="outlined" fullWidth onClick={clearFilters}>
          Clear Filters
        </Button>
      </Stack>
    </Paper>
  );
};

export default SeekerFilterPanel;
