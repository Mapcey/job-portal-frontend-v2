import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Pagination,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useAuth } from "../../context/AuthContext";

import Header_1 from "../../components/header/Header_1";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

// Mock job data
const jobList = new Array(20).fill(null).map((_, i) => ({
  id: i,
  title: `Frontend Developer ${i + 1}`,
  company: "Tech Corp",
  location: "Colombo",
  salary: "50K - 70K",
  education: "Bachelor's",
  experience: "2+ years",
}));

const categories = ["IT", "Finance", "Marketing"];
const jobTypes = ["Full-Time", "Part-Time", "Internship"];
const educationLevels = ["High School", "Bachelor's", "Master's"];
const experienceLevels = ["0-1 years", "2+ years", "5+ years"];

const BrowseJobs = () => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const jobsPerPage = 8;
  const displayedJobs = jobList.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  const handlePageChange = (_: any, value: number) => setPage(value);

  return (
    <Box className="browse-jobs-container">
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Breadcrumb
        title="Browse Jobs"
        description="Find your dream job here"
        backgroundImage="/imgs/backgrounds/bg-2.jpg"
      />

      {/* Search and Filter Section */}
      <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
        {/* Filters */}
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Filters</Typography>

          <TextField
            className="b-j-input-style-1"
            label="Location"
            variant="outlined"
            size="small"
          />
          <TextField
            className="b-j-input-style-1"
            select
            label="Category"
            variant="outlined"
            size="small"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="b-j-input-style-1"
            select
            label="Job Type"
            variant="outlined"
            size="small"
          >
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="b-j-input-style-1"
            select
            label="Education Level"
            variant="outlined"
            size="small"
          >
            {educationLevels.map((edu) => (
              <MenuItem key={edu} value={edu}>
                {edu}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className="b-j-input-style-1"
            select
            label="Experience Level"
            variant="outlined"
            size="small"
          >
            {experienceLevels.map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained">Filter</Button>
        </Box>

        {/* Results */}
        <Box sx={{ width: "75%" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                mb: 3,
                mr: 3,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{
                height: "55px",
                alignSelf: "flex-start",

                borderRadius: "30px",
                textTransform: "none",
                px: 3,
              }}
              // onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          <Grid container spacing={3}>
            {displayedJobs.map((job) => (
              <Grid item xs={12} sm={6} key={job.id}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company}
                    </Typography>
                    <Box
                      sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      <Chip variant="outlined" label={job.salary} />
                      <Chip variant="outlined" label={job.education} />
                      <Chip variant="outlined" label={job.location} />
                      <Chip variant="outlined" label={job.experience} />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Apply</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(jobList.length / jobsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseJobs;
