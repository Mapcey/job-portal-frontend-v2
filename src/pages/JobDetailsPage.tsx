import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Typography, Button, Chip } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { Job } from "../types/job";
import Loading from "../components/Loading";

import { getJobDetails, addSavedJob, addJobApplication } from "../services/APIs/APIs";


const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const { isAuthenticated } = useAuth();
  const { userInfo } = useAuth();
  const [_, setSeekerID] = useState<number>(0);
  const [savedJob, setSavedJobs] = useState<number[]>([]); 
  const [__, setAppliedJobs] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (id) {
      getJobDetails(id).then((data) => {
        if (data) setJob(data);
        else setJob(null);
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
    const handleApply = async (job: Job) => {
      try {
        await addJobApplication(job.JobId, {
          JobId: job.JobId,
          JobTitle: job.JobTitle,
          JobCategory: job.JobCategory,
          Description: job.Description,
          Status: "Applied",
          ApplicantName: userInfo?.FirstName && userInfo?.LastName ? `${userInfo.FirstName} ${userInfo.LastName}` : userInfo?.FirstName || userInfo?.LastName || "",
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

  return (
    <div className="job-details-page-container">
      {isAuthenticated ? <Header_2 /> : <Header_1 />}
      <Breadcrumb
        title="Job Details"
        description="Explore the details of your selected job"
        backgroundImage="/imgs/backgrounds/bg-2.jpg"
      />
      <div className="job-details-page-content">
        <Box className="job-details-page-section-1">
          <Box display={"flex"} flexDirection={"row"}>
            <Box
              sx={{
                width: 150,
                height: 150,
                borderRadius: 2, // optional, use 0 for perfect square
                backgroundImage: 'url("/imgs/grid/developing.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                marginBottom: 2,
              }}
            />
            <Box
              width={"400px"}
              display={"flex"}
              ml={2}
              mr={10}
              flexDirection={"column"}
            >
              <Typography variant="h4">{job.JobTitle}</Typography>
              {/* <Typography variant="h5">{job.CompanyName}</Typography> */}
              <Typography mb={2} variant="subtitle1">
                Data published:{" "}
                {/* {new Date(job.DatePublished).toLocaleDateString("en-GB")} */}
              </Typography>
              <Chip
                label={job.JobType}
                sx={{ width: "100px", color: "white" }}
              />
            </Box>
            <Box width={"40%"}>
              {Object.entries(tags).map(([key, value]) => (
                <Chip
                  key={key}
                  label={`${value}`}
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: "12px",
                    marginBottom: "10px",
                    marginRight: "10px",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          className="job-details-page-section-1"
          display={"flex"}
          flexDirection={"row"}
        >
          <Box flex={2} mr={"20px"}>
            <Typography mb={2} variant="h5">
              Job Description
            </Typography>
            <Box bgcolor={"#ebebeb"} borderRadius={3}>
              <Typography p={2}>{job.Description}</Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <Box>
              <Button
                variant="outlined"
                sx={{ width: "47%", marginRight: "5%" }}
                onClick={handleSaveJob}
                disabled={savedJob.includes(job.JobId)}
              >
                <FavoriteIcon />
                {savedJob.includes(job.JobId) ? "Saved" : "Save Job"}
              </Button>

              <Button variant="contained" sx={{ width: "47%" }}
              onClick={() => handleApply(job)}>
                Apply Now
              </Button>
            </Box>
            <Box mt={5}>
              <Typography mb={2} variant="h4">
                Job Overview
              </Typography>
              <Box p={2} borderRadius={2} bgcolor={"#ebebeb"}>
                <Typography mb={1}>
                  <strong> Job Overview:</strong> {job.JobType}
                </Typography>
                <Typography mb={1}>
                  <strong> Job Category:</strong> {tags.category}
                </Typography>
                <Typography mb={1}>
                  <strong> Job Experience:</strong> {tags.experince}
                </Typography>
                <Typography mb={1}>
                  <strong> Education Level:</strong> {tags.education}
                </Typography>
                <Typography mb={1}>
                  <strong> Location:</strong> {tags.location}
                </Typography>
                <Typography mb={1}>
                  <strong> Salery:</strong> {tags.salary}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button>
          <ReportIcon sx={{ color: "secondary.main" }} />
          <Typography color="secondary.light" variant="body2">
            Report Problem
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsPage;

