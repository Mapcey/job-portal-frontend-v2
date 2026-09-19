import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Card,
  Avatar,
  Chip,
  Pagination,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { Work, Category, School } from "@mui/icons-material";
import JobResultsSkeleton from "../placeholders/JobResultsSkeleton";

interface JobResultsProps {
  jobs: any[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  totalJobs: number;
  page: number;
  totalPages: number;
  onPageChange: (_: any, value: number) => void;
  appliedJobs: Set<number>;
  onApply: (job: any) => void;
}

const JobResults = ({
  jobs,
  loading,
  searchQuery,
  setSearchQuery,
  onSearch,
  totalJobs,
  page,
  totalPages,
  onPageChange,
  appliedJobs,
  onApply,
}: JobResultsProps) => {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      {/* Search */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          sx={{
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
          onClick={onSearch}
          sx={{
            height: 40,
            borderRadius: "30px",
            px: 3,
            flexShrink: 0,
          }}
        >
          Search
        </Button>
      </Box>

      {/* Result information */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="body2" color="text.secondary">
          {totalJobs} jobs found
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Page {page} of {totalPages}
        </Typography>
      </Box>

      {/* Loading */}
      {loading ? (
        <JobResultsSkeleton />
      ) : jobs.length === 0 ? (
        <Typography textAlign="center" py={5}>
          No jobs found.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {jobs.map((job) => (
            <Card
              key={job.JobId}
              variant="outlined"
              sx={{
                borderRadius: 2,
                p: 2,
                display: "flex",
                alignItems: "center",
                transition: "0.2s",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              {/* Company Avatar */}
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                {job.employer?.CompanyName
                  ? job.employer.CompanyName.charAt(0).toUpperCase()
                  : "C"}
              </Avatar>

              {/* Job information */}
              <Box flex={1} minWidth={0}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.JobTitle}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {job.employer?.CompanyName || "Company"} •{" "}
                  {[job.City, job.State].filter(Boolean).join(", ") ||
                    "Location not specified"}
                </Typography>

                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {job.JobType && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={job.JobType}
                      icon={<Work />}
                    />
                  )}

                  {job.JobCategory && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={job.JobCategory}
                      icon={<Category />}
                    />
                  )}

                  {job.EducationLevel && (
                    <Chip
                      size="small"
                      variant="outlined"
                      label={job.EducationLevel}
                      icon={<School />}
                    />
                  )}
                </Box>
              </Box>

              {/* Actions */}
              <Box display="flex" gap={1} ml={2} flexShrink={0}>
                <Button
                  size="small"
                  component={Link}
                  to={`/job_posts/details/${job.JobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  disabled={appliedJobs.has(job.JobId)}
                  onClick={() => onApply(job)}
                >
                  {appliedJobs.has(job.JobId) ? "Applied" : "Apply"}
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            onChange={onPageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default JobResults;
