import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// MUI
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Chip,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// FIELS
import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { Job } from "../types/job";
import Loading from "../components/Loading";
import { getAllJobs } from "../services/APIs/APIs";

const BrowseJobs = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [category, setCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [educationLevels, setEducationLevels] = useState<string[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);

  const jobsPerPage = 8;

  useEffect(() => {
    getAllJobs().then((data: Job[]) => {
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);

      setCategories([
        ...new Set(data.map((job: Job) => job.JobCategory)),
      ] as string[]);

      setJobTypes([
        ...new Set(data.map((job: Job) => job.JobType)),
      ] as string[]);

      setEducationLevels([
        ...new Set(data.map((job: Job) => job.EducationLevel)),
      ] as string[]);

      setExperienceLevels([
        ...new Set(
          data.map((job: Job) =>
            job.ProfExperience ? job.ProfExperience.toString() + "+ years" : ""
          )
        ),
      ] as string[]);
    });
  }, []);

  // Load jobs from backend
  useEffect(() => {
    getAllJobs().then((data) => {
      setJobs(data);
      setFilteredJobs(data); // initially show all
      setLoading(false);
    });
  }, []);

  // Filter logic (optional if you wire it to the Filter button)
  const handleFilter = () => {
    let result = [...jobs];

    if (category) result = result.filter((job) => job.JobCategory === category);
    if (jobType) result = result.filter((job) => job.JobType === jobType);
    if (educationLevel)
      result = result.filter((job) => job.EducationLevel === educationLevel);

    if (experienceLevel) {
      // Extract numeric part from string like "2+ years"
      const match = experienceLevel.match(/^(\d+)/);
      const experienceNumber = match ? parseInt(match[1], 10) : NaN;

      if (!isNaN(experienceNumber)) {
        result = result.filter((job) =>
          typeof job.ProfExperience === "number"
            ? job.ProfExperience <= experienceNumber
            : false
        );
      }

      console.log("Filtering for experience >= ", experienceNumber);
    }

    if (searchQuery)
      result = result.filter((job) =>
        job.JobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredJobs(result);
    setPage(1); // Reset to first page
  };

  const handleResetFilters = () => {
    setCategory("");
    setJobType("");
    setEducationLevel("");
    setExperienceLevel("");
    setSearchQuery("");
    setFilteredJobs(jobs); // show all jobs again
    setPage(1); // reset to first page
  };

  const handleSearch = () => {
    const result = jobs.filter((job) =>
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

  if (loading) return <Loading text="Loading All the Jobs..." />;

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

          {/* Location */}
          <TextField
            className="b-j-input-style-1"
            label="Location"
            variant="outlined"
            size="small"
          />

          {/* categories */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Category"
            value={category}
            variant="outlined"
            size="small"
            onChange={(e) => setCategory(e.target.value)}
          >
            {[...categories].sort().map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* job type */}
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

          {/* education level */}
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

          {/* experience level */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Experience Level"
            variant="outlined"
            size="small"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            {[...experienceLevels].sort().map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={handleFilter}
          >
            Filter
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              bgcolor: "secondary.light",
              color: "secondary.main",
            }}
            onClick={handleResetFilters}
          >
            Clear Filter
          </Button>
        </Box>

        {/* Results */}
        <Box sx={{ width: "75%" }}>
          <Box display={"flex"} flexDirection={"row"}>
            <TextField
              size="small"
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
                height: "38px",
                alignSelf: "flex-start",

                borderRadius: "30px",
                textTransform: "none",
                px: 3,
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
            gap={3}
          >
            {displayedJobs.map((job) => (
              <Card
                key={job.JobId}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardActionArea
                  onClick={() => navigate(`/jobs/details/${job.JobId}`)}
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

                    {/* Chips container (max 2 lines) */}
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        maxHeight: "3.6em",
                        overflow: "hidden",
                      }}
                    >
                      <Chip
                        label={
                          <Typography
                            fontSize={12}
                            noWrap
                            sx={{ maxWidth: 100 }}
                          >
                            {job.SalaryRange}
                          </Typography>
                        }
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        label={
                          <Typography
                            noWrap
                            sx={{ maxWidth: 100 }}
                            fontSize={12}
                          >
                            {job.EducationLevel}
                          </Typography>
                        }
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        label={
                          <Typography
                            noWrap
                            sx={{ maxWidth: 100 }}
                            fontSize={12}
                          >
                            {job.JobCategory}
                          </Typography>
                        }
                        variant="outlined"
                        size="small"
                      />
                      <Chip
                        label={
                          <Typography
                            noWrap
                            sx={{ maxWidth: 100 }}
                            fontSize={12}
                          >
                            {job.JobType}
                          </Typography>
                        }
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/jobs/details/${job.JobId}`}
                  >
                    View
                  </Button>
                  <Button size="small">Apply</Button>
                </CardActions>
              </Card>
            ))}
          </Box>

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
