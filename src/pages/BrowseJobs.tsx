import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// MUI
import {
  Box,
  Button,
  Card,
  // CardActions,
  // CardContent,
  // CardActionArea,
  Chip,
  MenuItem,
  Pagination,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Work, Category, School } from "@mui/icons-material";

// FIELS
import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { saved_jobs } from "../types/job";
import Loading from "../components/Loading";
import { getAllJobs } from "../services/APIs/APIs";

const BrowseJobs = () => {
  const { isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  const [jobs, setJobs] = useState<saved_jobs[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<saved_jobs[]>([]);
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
    getAllJobs().then((data: saved_jobs[]) => {
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);

      setCategories([
        ...new Set(data.map((job: saved_jobs) => job.JobCategory)),
      ] as string[]);

      setJobTypes([
        ...new Set(data.map((job: saved_jobs) => job.JobType)),
      ] as string[]);

      setEducationLevels([
        ...new Set(data.map((job: saved_jobs) => job.EducationLevel)),
      ] as string[]);

      setExperienceLevels([
        ...new Set(
          data.map((job: saved_jobs) =>
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
      {/* Header changes based on auth state */}
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      {/* Breadcrumb / Hero section */}
      <Breadcrumb
        title="Browse Jobs"
        description="Find your dream job here"
        backgroundImage="/imgs/backgrounds/bg-5.jpeg"
      />

      {/* Main layout: filters on the left, jobs on the right */}
      <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
        {/* ---------------- Left: Filter Panel ---------------- */}
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Filters</Typography>

          {/* Location (Autocomplete could be used later) */}
          <TextField
            className="b-j-input-style-1"
            label="Location"
            variant="outlined"
            size="small"
          />

          {/* Category */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
          >
            {[...categories].sort().map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* Job Type */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Job Type"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            size="small"
          >
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Education Level */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Education Level"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            size="small"
          >
            {educationLevels.map((edu) => (
              <MenuItem key={edu} value={edu}>
                {edu}
              </MenuItem>
            ))}
          </TextField>

          {/* Experience Level */}
          <TextField
            className="b-j-input-style-1"
            select
            label="Experience Level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            size="small"
          >
            {[...experienceLevels].sort().map((exp) => (
              <MenuItem key={exp} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </TextField>

          {/* Filter + Reset buttons */}
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

        {/* ---------------- Right: Job Results ---------------- */}
        <Box sx={{ width: "75%" }}>
          {/* Search bar + Search button */}
          <Box display="flex" flexDirection="row">
            <TextField
              size="small"
              fullWidth
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                mb: 3,
                mr: 3,
                "& .MuiOutlinedInput-root": { borderRadius: "30px" },
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
              sx={{ height: 38, borderRadius: "30px", px: 3 }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>

          {/* Results Info + Sorting Option */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body2" color="text.default">
              {filteredJobs.length} results found
            </Typography>
            {/* Sorting dropdown (recent/oldest) */}
            {/* <TextField
              select
              size="small"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </TextField> */}
          </Box>

          {/* Job List (currently Cards but can be list rows) */}
          <Box display="grid" gridTemplateColumns="1fr" gap={2}>
            {displayedJobs.map((job) => (
              <Card
                key={job.JobId}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                }}
              >
                {/* Company avatar / logo */}
                <Box sx={{ mr: 2 }}>
                  <Avatar
                    alt={job.employer.CompanyName}
                    src={""} // if no logo, Avatar shows fallback
                    sx={{ width: 48, height: 48 }}
                  >
                    {job.employer.CompanyName
                      ? job.employer.CompanyName.charAt(0).toUpperCase()
                      : "C"}
                  </Avatar>
                </Box>

                {/* Job info */}
                <Box flex={1}>
                  <Typography variant="h6">{job.JobTitle}</Typography>
                  <Typography variant="body2" color="text.default">
                    {job.employer.CompanyName} • {job.Location}
                  </Typography>

                  {/* Tags */}
                  <Box
                    sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {job.JobType && (
                      <Chip
                        variant="outlined"
                        label={job.JobType}
                        size="small"
                        sx={{ opacity: 0.6 }}
                        icon={<Work sx={{ p: 0.3 }} />}
                      />
                    )}
                    {job.JobCategory && (
                      <Chip
                        variant="outlined"
                        label={job.JobCategory}
                        size="small"
                        sx={{ opacity: 0.6 }}
                        icon={<Category sx={{ p: 0.3 }} />}
                      />
                    )}
                    {job.EducationLevel && (
                      <Chip
                        variant="outlined"
                        label={job.EducationLevel}
                        size="small"
                        sx={{ opacity: 0.6 }}
                        icon={<School sx={{ p: 0.3 }} />}
                      />
                    )}
                  </Box>
                </Box>

                {/* Actions */}
                <Box>
                  <Button
                    size="small"
                    component={Link}
                    to={`/jobs/details/${job.JobId}`}
                  >
                    View
                  </Button>
                  <Button size="small">Apply</Button>
                </Box>
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
