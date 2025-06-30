import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

import Header_1 from "../../components/header/Header_1";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

import { useAuth } from "../../context/AuthContext";
import { getAllJobs } from "../../services/APIs/seekerApis";
import { Job } from "../../types/job";

const categories = ["IT", "Finance", "Marketing"];
const jobTypes = ["Full-Time", "Part-Time", "Internship"];
const educationLevels = ["High School", "Bachelor's", "Master's"];
const experienceLevels = ["0-1 years", "2+ years", "5+ years"];

const BrowseJobs = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const jobsPerPage = 8;

  // Load jobs from backend
  useEffect(() => {
    getAllJobs().then((data) => {
      setJobs(data);
      setFilteredJobs(data); // initially show all
    });
  }, []);

  // Filter logic (optional if you wire it to the Filter button)
  const handleFilter = () => {
    let result = [...jobs];
    if (category) result = result.filter((job) => job.JobCategory === category);
    if (jobType) result = result.filter((job) => job.JobType === jobType);
    if (educationLevel)
      result = result.filter((job) => job.EducationLevel === educationLevel);
    if (experienceLevel)
      result = result.filter((job) => job.ProfExperience === experienceLevel);

    if (searchQuery)
      result = result.filter((job) =>
        job.JobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredJobs(result);
    setPage(1); // Reset to first page
  };

  const displayedJobs = filteredJobs.slice(
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
        backgroundImage="/imgs/backgrounds/bg-5.jpeg"
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
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
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
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
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
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
              <Grid item key={job.JobId} xs={12} sm={6} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minWidth: 300, // optional fixed min width
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {job.JobTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {job.Location}
                    </Typography>

                    {/* Chips container: max two lines */}
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        maxHeight: "3.6em", // roughly 2 lines height (depends on line-height)
                        overflow: "hidden",
                      }}
                    >
                      <Chip
                        label={
                          <Typography noWrap sx={{ maxWidth: 100 }}>
                            {job.SalaryRange}
                          </Typography>
                        }
                        variant="outlined"
                      />
                      <Chip
                        label={
                          <Typography noWrap sx={{ maxWidth: 100 }}>
                            {job.EducationLevel}
                          </Typography>
                        }
                        variant="outlined"
                      />
                      <Chip
                        label={
                          <Typography noWrap sx={{ maxWidth: 100 }}>
                            {job.JobCategory}
                          </Typography>
                        }
                        variant="outlined"
                      />

                      <Chip
                        label={
                          <Typography noWrap sx={{ maxWidth: 100 }}>
                            {job.JobType}
                          </Typography>
                        }
                        variant="outlined"
                      />
                      {/* <Chip label={job.EducationLevel} variant="outlined" />
                      <Chip label={job.JobCategory} variant="outlined" />
                      <Chip label={job.JobType} variant="outlined" /> */}
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => navigate(`/jobs/details/${job.JobId}`)}
                    >
                      View
                    </Button>
                    <Button size="small">Apply</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(filteredJobs.length / jobsPerPage)}
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
