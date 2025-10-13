import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const JobBreadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the jobs link dynamically
  const getJobsLink = () => {
    const searchParams = new URLSearchParams(location.search);
    if (location.pathname === "/jobs" && searchParams.has("page")) {
      return `/jobs?${searchParams.toString()}`; // preserve page
    }
    return "/jobs"; // default
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Home
      </Link>

      <Link
        href={getJobsLink()}
        onClick={(e) => {
          e.preventDefault();
          navigate(getJobsLink());
        }}
      >
        Jobs
      </Link>

      <Typography color="text.primary">Job Details</Typography>
    </Breadcrumbs>
  );

};
  export default JobBreadcrumbs;

