import { useAuth } from "../../context/AuthContext";
import { Box, Typography, Button, Chip } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Header_1 from "../../components/header/Header_1";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

const tags = {
  salary: "50K - 70K",
  education: "Bachelor's",
  location: "Colombo",
  langulage: "Emglish",
  experince: "3 - 5 yrs",
  ctegory: "Engineering",
};

const JobDetailsPage = () => {
  const { isAuthenticated } = useAuth();
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
              <Typography variant="h4">Software Engineer</Typography>
              <Typography variant="h5">ABC company</Typography>
              <Typography mb={2} variant="subtitle1">
                Data published: dd/mm/yy
              </Typography>
              <Chip label="Full time" sx={{ width: "100px", color: "white" }} />
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
            <Box bgcolor={"secondary.light"} borderRadius={3}>
              <Typography p={2}>
                Text between angle brackets is an HTML tag and is not displayed.
                Most tags, such as the HTML and /HTML tags that surround the
                contents of a page, come in pairs; some tags, like HR, for a
                horizontal rule, stand alone. Comments, such as the text you're
                reading, are not displayed when the Web page is shown. The
                information between the HEAD and /HEAD tags is not displayed.
                The information between the BODY and /BODY tags is displayed.
                Text between angle brackets is an HTML tag and is not displayed.
                Most tags, such as the HTML and /HTML tags that surround the
                contents of a page, come in pairs; some tags, like HR, for a
                horizontal rule, stand alone. Comments, such as the text you're
                reading, are not displayed when the Web page is shown. The
                information between the HEAD and /HEAD tags is not displayed.
                The information between the BODY and /BODY tags is displayed.
              </Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <Box>
              <Button
                variant="outlined"
                sx={{ width: "47%", marginRight: "5%" }}
              >
                <FavoriteIcon />
                Save Job
              </Button>
              <Button variant="contained" sx={{ width: "47%" }}>
                Apply Now
              </Button>
            </Box>
            <Box mt={5}>
              <Typography mb={2} variant="h4">
                Job Overview
              </Typography>
              <Box p={2} borderRadius={2} bgcolor={"secondary.light"}>
                <Typography mb={1}>
                  <strong> Job Overview:</strong> Full-time
                </Typography>
                <Typography mb={1}>
                  <strong> Job Category:</strong> Engineering
                </Typography>
                <Typography mb={1}>
                  <strong> Job Experience:</strong> 3 - 5 Years
                </Typography>
                <Typography mb={1}>
                  <strong> Education Level:</strong> Bachelor's
                </Typography>
                <Typography mb={1}>
                  <strong> Location:</strong> Colombo
                </Typography>
                <Typography mb={1}>
                  <strong> Salery:</strong> $50k - $75K
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
