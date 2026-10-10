import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

import { saved_jobs } from "../types/job";
import { getAllJobs } from "../services/APIs/APIs";

const RecentJobsSection = () => {
  const [jobs, setJobs] = useState<saved_jobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        setLoading(true);

        const response = await getAllJobs({
          page: 1,
          per_page: 100,
        });

        // API response contains { items: [...], total, pages }
        const allJobs: saved_jobs[] = response.items ?? [];

        // Sort by PostedDate, newest first
        const sortedJobs = [...allJobs].sort(
          (a, b) =>
            new Date(b.PostedDate).getTime() - new Date(a.PostedDate).getTime(),
        );

        // Keep only the 10 most recent jobs
        setJobs(sortedJobs.slice(0, 10));
      } catch (error) {
        console.error("Failed to load recent jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

  const visibleJobs = 3;

  const handlePrevious = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(jobs.length - visibleJobs, prev + 1));
  };

  const stripHtml = (html: string) =>
    html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 6 }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={700}
        sx={{ color: "#222" }}
      >
        Browse Recent Jobs
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Find the latest opportunities posted by employers.
      </Typography>

      {jobs.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No recent jobs available.
        </Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handlePrevious}
              disabled={activeIndex === 0}
              aria-label="Previous jobs"
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  transform: `translateX(calc(${activeIndex} * (-100% / 3 - 16px / 3)))`,
                  transition: "transform 0.4s ease-in-out",
                }}
              >
                {jobs.map((job) => (
                  <Card
                    key={job.JobId}
                    variant="outlined"
                    sx={{
                      flex: "0 0 calc((100% - 32px) / 3)",
                      minWidth: 0,
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.25s",
                      "&:hover": {
                        boxShadow: 3,
                        borderColor: "#f36d00",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {job.JobTitle}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {job.JobCategory}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          minHeight: 60,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {job.Description
                          ? stripHtml(job.Description)
                          : "No description available."}
                      </Typography>
                    </CardContent>

                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      gap={1}
                      sx={{ px: 2, pb: 2 }}
                    >
                      {job.SalaryRange && (
                        <Chip
                          size="small"
                          label={job.SalaryRange}
                          variant="outlined"
                        />
                      )}

                      {job.City && (
                        <Chip
                          size="small"
                          label={job.City}
                          variant="outlined"
                        />
                      )}

                      {job.JobType && (
                        <Chip
                          size="small"
                          label={job.JobType}
                          variant="outlined"
                        />
                      )}
                    </Stack>

                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          navigate(`/job_posts/details/${job.JobId}`)
                        }
                        sx={{
                          borderRadius: 2,
                          bgcolor: "#f36d00",
                          "&:hover": { bgcolor: "#d95e00" },
                        }}
                      >
                        More Details
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            </Box>

            <IconButton
              onClick={handleNext}
              disabled={activeIndex >= jobs.length - visibleJobs}
              aria-label="Next jobs"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/job_posts")}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                color: "#f36d00",
                borderColor: "#f36d00",
                "&:hover": {
                  borderColor: "#d95e00",
                  bgcolor: "#fff1e5",
                },
              }}
            >
              Browse More Jobs
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default RecentJobsSection;
