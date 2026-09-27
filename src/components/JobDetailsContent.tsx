import DOMPurify from "dompurify";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/History";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

import { saved_jobs } from "../types/job";
// import { color } from "framer-motion";

type JobDetailsContentProps = {
  job: saved_jobs;
  isSaved: boolean;
  isApplied: boolean;
  isAuthenticated: boolean;
  onApply: () => void;
  onSave: () => void;
  onReport: () => void;
};

const JobDetailsContent = ({
  job,
  isSaved,
  isApplied,
  isAuthenticated,
  onApply,
  onSave,
  onReport,
}: JobDetailsContentProps) => {
  // ---------------------------------------------------------
  // Expiry
  // ---------------------------------------------------------

  const expiryDate = new Date(job.ExpiryDate);
  const today = new Date();

  const timeDifference = expiryDate.getTime() - today.getTime();

  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const isExpired = daysLeft < 0;

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      {/* =====================================================
          JOB HEADER
      ===================================================== */}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Company / Job image */}

          <Box
            sx={{
              width: { xs: 80, md: 110 },
              height: { xs: 80, md: 110 },
              borderRadius: 2.5,
              flexShrink: 0,
              backgroundImage: 'url("/imgs/grid/developing.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Main information */}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.6rem",
                  sm: "2rem",
                  md: "2.25rem",
                },
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              {job.JobTitle}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              {job.JobCategory || "General"}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={job.JobType} color="primary" size="small" />

              {(job.Country || job.State || job.City) && (
                <Chip
                  icon={<LocationOnOutlinedIcon />}
                  label={[job.Country, job.State, job.City]
                    .filter(Boolean)
                    .join(", ")}
                  variant="outlined"
                  size="small"
                />
              )}
            </Stack>
          </Box>

          {/* Expiry */}

          <Box
            sx={{
              alignSelf: { xs: "flex-start", md: "center" },
              minWidth: { md: 170 },
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={0.5}
            >
              Application deadline
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <EventOutlinedIcon
                fontSize="small"
                color={isExpired ? "error" : "primary"}
              />

              <Typography
                fontWeight={600}
                color={isExpired ? "error.main" : "text.primary"}
              >
                {expiryDate.toLocaleDateString("en-GB")}
              </Typography>
            </Stack>

            <Typography
              variant="caption"
              color={isExpired ? "error.main" : "text.secondary"}
            >
              {isExpired
                ? "Application period ended"
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining`}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) 340px",
          },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <Box>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: { xs: 2.5, md: 4 },
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={2.5}>
              Job Description
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,

                "& p": {
                  mb: 2,
                },

                "& ul, & ol": {
                  pl: 3,
                  mb: 2,
                },

                "& li": {
                  mb: 1,
                },

                "& strong": {
                  color: "text.primary",
                  fontWeight: 600,
                },

                "& h1, & h2, & h3, & h4, & h5, & h6": {
                  color: "text.primary",
                  fontWeight: 700,
                  mt: 3,
                  mb: 1.5,
                },

                "& a": {
                  color: "primary.main",
                },
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.Description || ""),
                }}
              />
            </Box>
          </Paper>
        </Box>

        {/* ===================================================
            RIGHT SIDEBAR
        =================================================== */}

        <Box
          sx={{
            position: { md: "sticky" },
            top: { md: 24 },
          }}
        >
          {/* ACTION CARD */}

          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={onApply}
              disabled={isApplied || isExpired || !isAuthenticated}
              sx={{
                py: 1.4,
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              {isApplied
                ? "Application Submitted"
                : isExpired
                  ? "Applications Closed"
                  : "Apply Now"}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={onSave}
              disabled={isSaved || !isAuthenticated}
              startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              sx={{
                py: 1.3,
                fontWeight: 600,
              }}
            >
              {isSaved ? "Job Saved" : "Save Job"}
            </Button>
          </Paper>

          {/* JOB OVERVIEW */}

          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2.5}>
              Job Overview
            </Typography>

            <Stack spacing={2.5}>
              <OverviewItem
                icon={<WorkOutlineIcon sx={{ color: "white" }} />}
                label="Job Type"
                value={job.JobType}
              />

              <OverviewItem
                icon={<CategoryOutlinedIcon sx={{ color: "white" }} />}
                label="Category"
                value={job.JobCategory}
              />

              <OverviewItem
                icon={<HistoryOutlinedIcon sx={{ color: "white" }} />}
                label="Experience"
                value={
                  job.ProfExperience ? `${job.ProfExperience} Years` : undefined
                }
              />

              <OverviewItem
                icon={<SchoolOutlinedIcon sx={{ color: "white" }} />}
                label="Education"
                value={job.EducationLevel}
              />

              <OverviewItem
                icon={<LocationOnOutlinedIcon sx={{ color: "white" }} />}
                label="Location"
                value={
                  [job.Country, job.State, job.City]
                    .filter(Boolean)
                    .join(", ") || "Location not specified"
                }
              />

              <OverviewItem
                icon={<MonetizationOnOutlinedIcon sx={{ color: "white" }} />}
                label="Salary"
                value={job.SalaryRange}
              />
            </Stack>
          </Paper>
        </Box>
      </Box>
      <Button
        variant="text"
        color="secondary"
        fullWidth
        onClick={onReport}
        startIcon={<ReportProblemOutlinedIcon />}
        sx={{
          mt: 1,
          textTransform: "none",
        }}
      >
        Report a problem
      </Button>
    </Box>
  );
};

// =============================================================
// Overview Item
// =============================================================

type OverviewItemProps = {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
};

const OverviewItem = ({ icon, label, value }: OverviewItemProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 38,
        height: 38,
        borderRadius: 2,
        backgroundColor: "action.hover",
        color: "primary.main",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Box sx={{ minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" display="block">
        {label}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={600}
        sx={{
          wordBreak: "break-word",
        }}
      >
        {value || "Not specified"}
      </Typography>
    </Box>
  </Box>
);

export default JobDetailsContent;
