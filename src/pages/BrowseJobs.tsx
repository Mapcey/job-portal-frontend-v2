import { useEffect, useState } from "react";
import { Box } from "@mui/material";

// FIELS
import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import { useAuth } from "../context/AuthContext";
import { saved_jobs } from "../types/job";

import { getAllJobs, addJobApplication } from "../services/APIs/APIs"; // 👈 import addJobApplication
import JobFilterPanel from "../components/browseJobs/JobFilterPanel";
import JobResults from "../components/browseJobs/JobResults";

const BrowseJobs = () => {
  const { isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<saved_jobs[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage] = useState(8);

  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    title: "",
    location: "",
    category: "",
    job_type: "",
    work_type: "",
    education: "",
    experience: "",
    posted_days_ago: "",
    min_salary: "",
    max_salary: "",
  });

  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set()); // 👈 track applied jobs

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await getAllJobs({
          page,
          per_page: perPage,

          title: filters.title || undefined,
          location: filters.location || undefined,
          category: filters.category || undefined,
          job_type: filters.job_type || undefined,
          work_type: filters.work_type || undefined,
          education: filters.education || undefined,
          experience: filters.experience || undefined,

          posted_days_ago: filters.posted_days_ago || undefined,

          min_salary: filters.min_salary || undefined,

          max_salary: filters.max_salary || undefined,
        });

        setJobs(response.items);
        setTotalJobs(response.total);
        setTotalPages(response.pages);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, perPage, filters]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        ApplicantName: "John Doe", // replace with logged-in user's name
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

  return (
    <Box className="browse-jobs-container">
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Breadcrumb
        title="Browse Jobs"
        description="Find your dream job here"
        backgroundImage="/imgs/backgrounds/bg-5.jpeg"
        path={[{ label: "Home", href: "/" }, { label: "Jobs" }]}
      />

      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          {/* LEFT FILTER */}
          <Box
            sx={{
              width: 280,
              flexShrink: 0,
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <JobFilterPanel
              filters={filters}
              setFilters={setFilters}
              onApply={() => {
                setPage(1);
              }}
              onClear={() => {
                setFilters({
                  title: "",
                  location: "",
                  category: "",
                  job_type: "",
                  work_type: "",
                  education: "",
                  experience: "",
                  posted_days_ago: "",
                  min_salary: "",
                  max_salary: "",
                });

                setPage(1);
              }}
            />
          </Box>

          {/* RIGHT RESULTS */}
          <JobResults
            jobs={jobs}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={() => {
              setFilters((prev) => ({
                ...prev,
                title: searchQuery,
              }));

              setPage(1);
            }}
            totalJobs={totalJobs}
            page={page}
            totalPages={totalPages}
            onPageChange={(_, value) => {
              setPage(value);
            }}
            appliedJobs={appliedJobs}
            onApply={handleApply}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseJobs;
