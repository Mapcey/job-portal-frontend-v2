import { useParams } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";

import {
  Box, Typography, Button, Chip, Stack, Paper, useMediaQuery,
  useTheme,
} from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HistoryIcon from "@mui/icons-material/History";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {  Public } from "@mui/icons-material";
// import { createReport } from "../services/APIs/APIs";
// FILES
import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import FooterSection_1 from "../components/footer/FooterSection_1";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { saved_jobs } from "../types/job";
import Loading from "../components/Loading";
import DOMPurify from "dompurify";
import ReportDialog from "../components/ReportDialog";

import {
  getJobDetails,
  addJobApplication,
  addSavedJob,
} from "../services/APIs/APIs";

type OverviewItemProps = {
  icon: ReactNode;
  label: string;
  value?: string | number | null;
};

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<saved_jobs | null>(null);
  const { isAuthenticated, userInfo } = useAuth();
  const [_, setSeekerID] = useState<number>(0);
  const [savedJob, setSavedJobs] = useState<number[]>([]);
  const [__, setAppliedJobs] = useState<Set<number>>(new Set());


  // state for the Report dialog
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    if (id) {
      getJobDetails(id).then((data) => {
        if (data) {
          setJob(data);
        } else setJob(null);
      });
    }
  }, [id]);

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) setSeekerID(userInfo.UserId);
  }, [userInfo]);

  const tags = {
    salary: job?.SalaryRange,
    education: job?.EducationLevel,
    location: job?.Location,
    langulage: job?.Languages,
    experince: `${job?.ProfExperience} Years`,
    category: job?.JobCategory,
  };

  // 👇 main apply function
  const handleApply = async (job: saved_jobs) => {
    try {
      await addJobApplication(job.JobId, {
        JobId: job.JobId,
        JobTitle: job.JobTitle,
        JobCategory: job.JobCategory,
        Description: job.Description,
        Status: "Applied",
        ApplicantName:
          userInfo?.FirstName && userInfo?.LastName
            ? `${userInfo.FirstName} ${userInfo.LastName}`
            : userInfo?.FirstName || userInfo?.LastName || "",
        AppliedDateTime: new Date().toISOString(),
      });
      // mark as applied in UI
      setAppliedJobs((prev) => new Set(prev).add(job.JobId));
      alert(`Application submitted for ${job.JobTitle}`);
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Could not apply for this job. Please try again.");
    }
  };

  const handleSaveJob = async () => {
    if (!userInfo?.UserId || !job?.JobId) return;

    try {
      // Check if already saved
      if (savedJob.includes(job.JobId)) {
        alert("Job already saved!");
        return;
      }

      const savedJobObj = {
        JobId: job.JobId,
        SavedDateTime: new Date().toISOString(),
      };
      await addSavedJob(userInfo.UserId, savedJobObj);
      setSavedJobs([...savedJob, job.JobId]);
      alert("Job saved successfully!");
    } catch (err) {
      console.error("Failed to save job:", err);
      alert("Failed to save job. Try again.");
    }
  };

  if (!job) return <Loading text="Loading Job Data..." />;

  // Calculate days left
  const expiryDate = new Date(job.ExpiryDate);
  const today = new Date();
  const timeDiff = expiryDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="job-details-page-container">
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

<Breadcrumb
  title="Job Details"
  description="Explore the details of your selected job."
  backgroundImage="/imgs/backgrounds/bg-2.jpg"
  path={[
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/jobs" },
    { label: "Job Details" },
  ]}
/>

      <Box
        className="job-details-page-content"
        sx={{ p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto" }}
      >
        {/* --- Top section with image & chips --- */}
        <Box
          className="job-details-page-section-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: 2, md: 4 },
            mb: 4,
          }}
        >
          {/* Job Image */}
          <Box
            sx={{
              width: { xs: "100%", sm: 200 },
              height: { xs: 180, sm: 200 },
              borderRadius: 2,
              backgroundImage: 'url("/imgs/grid/developing.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              flexShrink: 0,
            }}
          />

          {/* Job title and type */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight={600}>
              {job.JobTitle}
            </Typography>

            <Typography
              display="flex"
              alignItems="center"
              gap={1}
              variant="subtitle1"
              color="text.secondary"
            >
              <EventNoteIcon fontSize="small" />
              Expire: {expiryDate.toLocaleDateString("en-GB")}{" "}
              {daysLeft >= 0
                ? `(${daysLeft} day${daysLeft > 1 ? "s" : ""} left)`
                : "(Expired)"}
            </Typography>

            <Typography variant={isMobile ? "subtitle1" : "subtitle1"}              display="flex"
              alignItems="center"
              gap={1} mb={2} color="text.secondary">
               <Public fontSize="small" />
              {job.Location}, Sri Lanka
            </Typography>

            <Chip
              label={job.JobType}
              sx={{
                width: "fit-content",
                color: "white",
                backgroundColor: theme.palette.primary.main,
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Tags section */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              mt: { xs: 2, md: 0 },
            }}
          >
            {Object.entries(tags)
              .filter(([_, value]) => value && value.trim() !== "")
              .map(([key, value]) => (
                <Chip
                  key={key}
                  label={value}
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: "12px",
                    mb: 1,
                    mr: 1,
                  }}
                />
              ))}
          </Box>
        </Box>

        {/* --- Description and sidebar --- */}
        <Box
          className="job-details-page-section-2"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 5 },
          }}
        >
          {/* Job Description */}
          <Box flex={2}>
            <Typography mb={2} variant="h5" fontWeight={600}>
              Job Description
            </Typography>

            <Box
              bgcolor="#fff"
              borderRadius={3}
              p={2}
              sx={{
                "& ul, & ol": { pl: 3 },
                "& li": { mb: 1 },
                "& p": { mb: 1.5 },
                "& strong": { fontWeight: 600 },
                "& h1, & h2, & h3, & h4, & h5, & h6": { mt: 2, mb: 2 },
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.Description || ""),
                }}
              />
            </Box>
          </Box>

          {/* --- Sidebar --- */}
          <Box flex={1}>
            {/* Buttons */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
              mb={2}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSaveJob}
                disabled={savedJob.includes(job.JobId)}
                startIcon={<FavoriteIcon />}
              >
                {savedJob.includes(job.JobId) ? "Saved" : "Save Job"}
              </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleApply(job)}
              >
                Apply Now
              </Button>
            </Box>

            {/* Report button */}
            <Box mb={4}>
              <Button
                onClick={handleOpen}
                sx={{ gap: 1 }}
                color="secondary"
                startIcon={<ReportIcon />}
              >
                Report Problem
              </Button>
            </Box>

            {/* Job Overview */}
            <Box>
              <Typography variant="h5" fontWeight={600} mb={3}>
                Job Overview
              </Typography>

              <Paper
                elevation={2}
                sx={{
                  borderRadius: 3,
                  p: 3,
                  backgroundColor: "#fafafa",
                }}
              >
                <Stack spacing={2.5}>
                  <OverviewItem
                    icon={<WorkIcon color="primary" />}
                    label="Job Type"
                    value={job.JobType}
                  />
                  <OverviewItem
                    icon={<CategoryIcon color="primary" />}
                    label="Category"
                    value={tags.category}
                  />
                  <OverviewItem
                    icon={<HistoryIcon color="primary" />}
                    label="Experience"
                    value={tags.experince}
                  />
                  <OverviewItem
                    icon={<SchoolIcon color="primary" />}
                    label="Education Level"
                    value={tags.education}
                  />
                  <OverviewItem
                    icon={<LocationOnIcon color="primary" />}
                    label="Location"
                    value={tags.location}
                  />
                  <OverviewItem
                    icon={<MonetizationOnIcon color="primary" />}
                    label="Salary"
                    value={tags.salary}
                  />
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Report dialog */}
        <ReportDialog
          open={open}
          onClose={handleClose}
          mode="employer"
          id={job.JobId}
        />
      </Box>

      <FooterSection_1 />
    </div>
  );
};

// Helper subcomponent for clean layout
const OverviewItem = ({ icon, label, value }: OverviewItemProps) => (
  <Box display="flex" alignItems="center" gap={1.5}>
    {icon}
    <Typography variant="body1">
      <strong>{label}:</strong> {value || "Not specified"}
    </Typography>
  </Box>
);

export default JobDetailsPage;