import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import FooterSection_1 from "../components/footer/FooterSection_1";
import Breadcrumb from "../components/common/Breadcrumb";
import Loading from "../components/Loading";
import ReportDialog from "../components/ReportDialog";

import { useAuth } from "../context/AuthContext";
import { saved_jobs } from "../types/job";

import {
  getJobDetails,
  addJobApplication,
  addSavedJob,
} from "../services/APIs/APIs";

import JobDetailsContent from "../components/JobDetailsContent";

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { isAuthenticated, userInfo } = useAuth();

  const [job, setJob] = useState<saved_jobs | null>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());

  const [reportOpen, setReportOpen] = useState(false);

  // ---------------------------------------------------------
  // Fetch job
  // ---------------------------------------------------------

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        const data = await getJobDetails(id);

        if (data) {
          setJob(data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Failed to load job:", error);
        setJob(null);
      }
    };

    loadJob();
  }, [id]);

  // ---------------------------------------------------------
  // Apply
  // ---------------------------------------------------------

  const handleApply = async () => {
    if (!job || !userInfo?.UserId) return;

    try {
      await addJobApplication(job.JobId, {
        JobId: job.JobId,
        JobTitle: job.JobTitle,
        JobCategory: job.JobCategory,
        Description: job.Description,
        Status: "Applied",

        ApplicantName:
          userInfo.FirstName && userInfo.LastName
            ? `${userInfo.FirstName} ${userInfo.LastName}`
            : userInfo.FirstName || userInfo.LastName || "",

        AppliedDateTime: new Date().toISOString(),
      });

      setAppliedJobs((previous) => {
        const updated = new Set(previous);
        updated.add(job.JobId);
        return updated;
      });

      alert(`Application submitted for ${job.JobTitle}`);
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("Could not apply for this job. Please try again.");
    }
  };

  // ---------------------------------------------------------
  // Save job
  // ---------------------------------------------------------

  const handleSaveJob = async () => {
    if (!userInfo?.UserId || !job?.JobId) return;

    if (savedJobs.includes(job.JobId)) {
      return;
    }

    try {
      const savedJobObj = {
        JobId: job.JobId,
        SavedDateTime: new Date().toISOString(),
      };

      await addSavedJob(userInfo.UserId, savedJobObj);

      setSavedJobs((previous) => [...previous, job.JobId]);

      alert("Job saved successfully!");
    } catch (error) {
      console.error("Failed to save job:", error);
      alert("Failed to save job. Please try again.");
    }
  };

  // ---------------------------------------------------------
  // Loading
  // ---------------------------------------------------------

  if (!job) {
    return <Loading text="Loading Job Data..." />;
  }

  const isSaved = savedJobs.includes(job.JobId);
  const isApplied = appliedJobs.has(job.JobId);

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

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

      <JobDetailsContent
        job={job}
        isSaved={isSaved}
        isApplied={isApplied}
        isAuthenticated={isAuthenticated}
        onApply={handleApply}
        onSave={handleSaveJob}
        onReport={() => setReportOpen(true)}
      />

      <ReportDialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        mode="employer"
        id={job.JobId}
      />

      <FooterSection_1 />
    </div>
  );
};

export default JobDetailsPage;
