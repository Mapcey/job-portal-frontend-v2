import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { saved_jobs } from "../types/job";
import { getAllJobs } from "../services/APIs/APIs";
import Loading from "../components/Loading";

const RecentJobsSection = () => {
  const [jobs, setJobs] = useState<saved_jobs[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    getAllJobs()
      .then((data: saved_jobs[]) => {
        // Sort by date (assuming you have CreatedAt or similar field)
        const sortedJobs = [...data].sort(
          (a, b) =>
            new Date(b.PostedDate).getTime() - new Date(a.PostedDate).getTime()
        );

        // Limit to first 18
        const limitedJobs = sortedJobs.slice(0, 18);

        setJobs(limitedJobs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (loading) return <Loading text="Loading recent jobs..." />;

  const displayedJobs = jobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  return (
    <div className="recent-jobs-section-container">
      <div className="recent-jobs-section-content">
        <Typography
          variant="h4"
          textAlign={"center"}
          className="recent-jobs-title"
        >
          Browse Recent Jobs
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          className="recent-jobs-title"
          sx={{ width: "50%", marginTop: "10px", mx: "auto" }}
        >
          Find the most recent opportunities posted by employers
        </Typography>

        <div className="recent-jobs-section-cards">
          <Grid container spacing={3} justifyContent="center">
            {displayedJobs.map((job) => (
              <Card
                sx={{
                  width: "500px",
                  borderRadius: "10px",
                  transition: "0.3s", // smooth hover animation
                  "&:hover": {
                    backgroundColor: "#f8f8f8ff", // light gray (change to your color)
                    boxShadow: 1, // subtle shadow
                    cursor: "pointer",
                  },
                }}
                variant="outlined"
              >
                <CardActions sx={{ justifyContent: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "10px" }}
                    onClick={() => navigate(`/jobs/details/${job.JobId}`)}
                  >
                    More Details
                  </Button>
                </CardActions>
                <CardContent>
                  <Typography variant="h6">{job.JobTitle}</Typography>
                  <Typography variant="body2" color="text.disabled">
                    {job.JobCategory} — {job.Location}
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary">
                    {job.Description
                      ? job.Description.replace(/<\/?[^>]+(>|$)/g, "").slice(
                          0,
                          50
                        ) + "..."
                      : ""}
                  </Typography>
                </CardContent>
                <Stack direction="row" m={2} spacing={1}>
                  {job.SalaryRange && (
                    <Chip
                      size="small"
                      label={job.SalaryRange}
                      variant="outlined"
                    />
                  )}
                  {/* {job.EducationLevel && (
                    <Chip
                      variant="outlined"
                      size="small"
                      label={job.EducationLevel}
                    />
                  )} */}
                  {job.Location && (
                    <Chip
                      variant="outlined"
                      size="small"
                      label={job.Location}
                    />
                  )}
                  {job.JobType && (
                    <Chip variant="outlined" size="small" label={job.JobType} />
                  )}
                </Stack>
              </Card>
            ))}
          </Grid>

          <Pagination
            count={Math.ceil(jobs.length / jobsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentJobsSection;
