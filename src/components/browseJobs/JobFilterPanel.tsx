import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import {
  JOB_CAT,
  JOB_TYPES,
  WORK_TYPE,
  EDU_LEVELS,
} from "../../types/jobOptions";

import { LOCATION_DATA } from "../../types/locationOptions";

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
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const countries = LOCATION_DATA;

  const selectedCountry = countries.find(
    (country) => country.name === filters.country,
  );

  const provinces = selectedCountry?.provinces || [];

  const selectedProvince = provinces.find(
    (province) => province.name === filters.province,
  );

  const cities = selectedProvince?.cities || [];

  return (
    <Box
      sx={{
        position: { xs: "static", md: "sticky" },
        top: { md: 90 },
        p: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: { xs: 2, md: 2 },
        bgcolor: "background.paper",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {" "}
      {/* Header */}{" "}
      <Typography
        variant="h6"
        fontWeight={600}
        mb={{ xs: 1, sm: 1.5 }}
        sx={{ fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" } }}
      >
        {" "}
        Filters{" "}
      </Typography>{" "}
      <Divider sx={{ mb: { xs: 2, sm: 2.5 } }} /> {/* Location */}{" "}
      {/* Category */}{" "}
      <TextField
        fullWidth
        select
        size="small"
        label="Category"
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        sx={{ mb: 2 }}
      >
        {" "}
        <MenuItem value="">All Categories</MenuItem>
        {JOB_CAT.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>{" "}
      {/* Job Type */}{" "}
      <TextField
        fullWidth
        select
        size="small"
        label="Job Type"
        value={filters.job_type}
        onChange={(e) => handleChange("job_type", e.target.value)}
        sx={{ mb: 2 }}
      >
        {" "}
        <MenuItem value="">All Job Types</MenuItem>
        {JOB_TYPES.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
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
        {WORK_TYPE.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      {/* Country */}
      <TextField
        fullWidth
        select
        size="small"
        label="Country"
        value={filters.country}
        onChange={(e) => {
          handleChange("country", e.target.value);

          // Reset dependent fields
          handleChange("province", "");
          handleChange("city", "");
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Countries</MenuItem>

        {countries.map((country) => (
          <MenuItem key={country.name} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>
      {/* Province */}
      <TextField
        fullWidth
        select
        size="small"
        label="Province"
        value={filters.province}
        disabled={!filters.country}
        onChange={(e) => {
          handleChange("province", e.target.value);

          // Reset city when province changes
          handleChange("city", "");
        }}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Provinces</MenuItem>

        {provinces.map((province) => (
          <MenuItem key={province.name} value={province.name}>
            {province.name}
          </MenuItem>
        ))}
      </TextField>
      {/* City */}
      <TextField
        fullWidth
        select
        size="small"
        label="City"
        value={filters.city}
        disabled={!filters.province}
        onChange={(e) => handleChange("city", e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="">All Cities</MenuItem>

        {cities.map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </TextField>
      {/* Education */}{" "}
      <TextField
        fullWidth
        select
        size="small"
        label="Education"
        value={filters.education}
        onChange={(e) => handleChange("education", e.target.value)}
        sx={{ mb: 2 }}
      >
        {" "}
        <MenuItem value="">All Education Levels</MenuItem>{" "}
        {EDU_LEVELS.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>{" "}
      {/* Experience */}{" "}
      <TextField
        fullWidth
        select
        size="small"
        label="Experience"
        value={filters.experience}
        onChange={(e) => handleChange("experience", e.target.value)}
        sx={{ mb: 2 }}
      >
        {" "}
        <MenuItem value="">Any Experience</MenuItem>{" "}
        <MenuItem value="0">0+ years</MenuItem>{" "}
        <MenuItem value="1">1+ years</MenuItem>{" "}
        <MenuItem value="3">3+ years</MenuItem>{" "}
        <MenuItem value="5">5+ years</MenuItem>{" "}
        <MenuItem value="10">10+ years</MenuItem>{" "}
      </TextField>{" "}
      {/* Posted Within */}{" "}
      <TextField
        fullWidth
        select
        size="small"
        label="Posted Within"
        value={filters.posted_days_ago}
        onChange={(e) => handleChange("posted_days_ago", e.target.value)}
        sx={{ mb: 2 }}
      >
        {" "}
        <MenuItem value="">Any Time</MenuItem>{" "}
        <MenuItem value="1">Last 24 hours</MenuItem>{" "}
        <MenuItem value="7">Last 7 days</MenuItem>{" "}
        <MenuItem value="14">Last 14 days</MenuItem>{" "}
        <MenuItem value="30">Last 30 days</MenuItem>{" "}
      </TextField>{" "}
      {/* Salary */}{" "}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 3,
        }}
      >
        {" "}
        {/* Minimum Salary */}{" "}
        <TextField
          fullWidth
          size="small"
          type="number"
          label="Min Salary"
          value={filters.min_salary}
          onChange={(e) => handleChange("min_salary", e.target.value)}
        />{" "}
        {/* Maximum Salary */}{" "}
        <TextField
          fullWidth
          size="small"
          type="number"
          label="Max Salary"
          value={filters.max_salary}
          onChange={(e) => handleChange("max_salary", e.target.value)}
        />{" "}
      </Box>{" "}
      {/* Buttons */}{" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "column" },
          gap: 1.5,
        }}
      >
        {" "}
        <Button
          variant="contained"
          fullWidth
          onClick={onApply}
          sx={{ minHeight: 40 }}
        >
          {" "}
          Apply Filters{" "}
        </Button>{" "}
        <Button
          variant="outlined"
          fullWidth
          onClick={onClear}
          sx={{ minHeight: 40 }}
        >
          {" "}
          Clear Filters{" "}
        </Button>{" "}
      </Box>{" "}
    </Box>
  );
};
export default JobFilterPanel;
