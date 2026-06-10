import React from "react";
import { Box, TextField, Typography, MenuItem, Button } from "@mui/material";

const SeekerFilterPanel = ({ filters, setFilters, onClose }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Filters
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Search"
        name="search"
        value={filters.search}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        fullWidth
        size="small"
        label="Category"
        name="category"
        value={filters.category}
        onChange={handleChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="IT">IT</MenuItem>
        <MenuItem value="Design">Design</MenuItem>
      </TextField>

      <TextField
        fullWidth
        size="small"
        label="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        size="small"
        label="Education"
        name="education"
        value={filters.education}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        size="small"
        label="Experience"
        name="experience"
        value={filters.experience}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />

      {onClose && (
        <Button fullWidth variant="contained" onClick={onClose}>
          Apply Filters
        </Button>
      )}
    </Box>
  );
};

export default SeekerFilterPanel;
