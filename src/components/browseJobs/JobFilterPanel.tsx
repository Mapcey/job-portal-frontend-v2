// import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

interface JobFilterPanelProps {
  filters: any;
  setFilters: any;
  onApply: () => void;
  onClear: () => void;
}

const JobFilterPanel = ({
  filters,
  setFilters,
  onApply,
  onClear,
}: JobFilterPanelProps) => {
  const handleChange = (name: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        position: { md: "sticky" },
        top: 90,
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={1}>
        Filters
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Location */}
      <TextField
        fullWidth
        size="small"
        label="Location"
        value={filters.location}
        onChange={(e) => handleChange("location", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Category */}
      <TextField
        fullWidth
        select
        size="small"
        label="Category"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="IT">IT</MenuItem>
        <MenuItem value="Design">Design</MenuItem>
        <MenuItem value="Marketing">Marketing</MenuItem>
      </TextField>

      {/* Job Type */}
      <TextField
        fullWidth
        select
        size="small"
        label="Job Type"
        value={filters.job_type}
        onChange={(e) => handleChange("job_type", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Job Types</MenuItem>
        <MenuItem value="Full-time">Full-time</MenuItem>
        <MenuItem value="Part-time">Part-time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </TextField>

      {/* Work Type */}
      <TextField
        fullWidth
        select
        size="small"
        label="Work Type"
        value={filters.work_type}
        onChange={(e) => handleChange("work_type", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Work Types</MenuItem>
        <MenuItem value="On-site">On-site</MenuItem>
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Hybrid">Hybrid</MenuItem>
      </TextField>

      {/* Education */}
      <TextField
        fullWidth
        select
        size="small"
        label="Education"
        value={filters.education}
        onChange={(e) => handleChange("education", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Education Levels</MenuItem>
        <MenuItem value="High School">High School</MenuItem>
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="Bachelors">Bachelors</MenuItem>
        <MenuItem value="Masters">Masters</MenuItem>
        <MenuItem value="PhD">PhD</MenuItem>
      </TextField>

      {/* Experience */}
      <TextField
        fullWidth
        select
        size="small"
        label="Experience"
        value={filters.experience}
        onChange={(e) => handleChange("experience", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Any Experience</MenuItem>
        <MenuItem value="0">0+ years</MenuItem>
        <MenuItem value="1">1+ years</MenuItem>
        <MenuItem value="3">3+ years</MenuItem>
        <MenuItem value="5">5+ years</MenuItem>
        <MenuItem value="10">10+ years</MenuItem>
      </TextField>

      {/* Posted Within */}
      <TextField
        fullWidth
        select
        size="small"
        label="Posted Within"
        value={filters.posted_days_ago}
        onChange={(e) => handleChange("posted_days_ago", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Any Time</MenuItem>
        <MenuItem value="1">Last 24 hours</MenuItem>
        <MenuItem value="7">Last 7 days</MenuItem>
        <MenuItem value="14">Last 14 days</MenuItem>
        <MenuItem value="30">Last 30 days</MenuItem>
      </TextField>

      {/* Minimum Salary */}
      <TextField
        fullWidth
        size="small"
        type="number"
        label="Minimum Salary"
        value={filters.min_salary}
        onChange={(e) => handleChange("min_salary", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Maximum Salary */}
      <TextField
        fullWidth
        size="small"
        type="number"
        label="Maximum Salary"
        value={filters.max_salary}
        onChange={(e) => handleChange("max_salary", e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Buttons */}
      <Box display="flex" flexDirection="column" gap={1}>
        <Button variant="contained" fullWidth onClick={onApply}>
          Apply Filters
        </Button>

        <Button variant="outlined" fullWidth onClick={onClear}>
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default JobFilterPanel;
