import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const AboutPage = () => {
  const { isAuthenticated, userRole } = useAuth();

  const navigate = useNavigate();

  const services = [
    {
      icon: <GroupsOutlinedIcon />,
      title: "Strategic Talent Acquisition",
      description:
        "We help businesses connect with suitable professionals by bringing employers and job seekers together. Our platform makes it easier to discover opportunities and identify talent that aligns with organizational needs.",
    },
    {
      icon: <TrendingUpRoundedIcon />,
      title: "Career Development",
      description:
        "We support individuals in exploring career opportunities, presenting their professional experience, and taking meaningful steps toward their career goals.",
    },
    {
      icon: <AutoAwesomeOutlinedIcon />,
      title: "Employer Branding",
      description:
        "We help companies build a stronger professional presence and showcase their workplace, opportunities, and organizational identity to potential candidates.",
    },
    {
      icon: <WorkOutlineRoundedIcon />,
      title: "Smarter Recruitment",
      description:
        "We aim to simplify the recruitment journey through accessible job listings, employer tools, and a more organized approach to connecting with potential candidates.",
    },
  ];

  const values = [
    {
      icon: <HandshakeOutlinedIcon />,
      title: "Integrity",
      description:
        "Building trust through transparency, honesty, and meaningful professional connections.",
    },
    {
      icon: <AutoAwesomeOutlinedIcon />,
      title: "Innovation",
      description:
        "Continuously exploring better ways to improve recruitment and career experiences.",
    },
    {
      icon: <GroupsOutlinedIcon />,
      title: "Inclusivity",
      description:
        "Creating opportunities where diverse skills, experiences, and perspectives are valued.",
    },
    {
      icon: <TrendingUpRoundedIcon />,
      title: "Growth",
      description:
        "Encouraging continuous learning, professional development, and business success.",
    },
  ];

  const handleFindTalent = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userRole === "employer") {
      navigate("/employer/post");
      return;
    }

    if (userRole === "seeker") {
      navigate("/signup");
      return;
    }

    // Fallback for unknown or unavailable roles
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Breadcrumb
        title="About Suicul"
        description="Connecting talent, empowering careers, and helping businesses grow."
        backgroundImage="/imgs/backgrounds/bg-7.jpg"
        path={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Introduction Section */}
      <Box
        sx={{
          bgcolor: "#fff",
          py: { xs: 7, md: 11 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: 850,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              WHO WE ARE
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                mt: 1,
                mb: 3,
                fontSize: { xs: 30, sm: 36, md: 44 },
                lineHeight: 1.2,
              }}
            >
              Bringing People and Opportunities Together
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "secondary.main",
                fontSize: { xs: 15, md: 17 },
                lineHeight: 2,
                mb: 2,
              }}
            >
              Suicul is a dynamic talent acquisition and career development
              platform dedicated to creating meaningful connections between
              businesses and professionals. We believe that the right
              opportunities and the right people can make a lasting difference.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "secondary.main",
                fontSize: { xs: 15, md: 17 },
                lineHeight: 2,
              }}
            >
              By bringing recruitment, career opportunities, and professional
              branding together, we aim to make the hiring experience more
              accessible, efficient, and valuable for everyone involved.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Box
        sx={{
          bgcolor: "primary.light",
          py: { xs: 7, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth={700} mx="auto" mb={6}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              WHAT WE DO
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#4d4017",
                fontWeight: 800,
                mt: 1,
                mb: 2,
                fontSize: { xs: 28, md: 36 },
              }}
            >
              Our Core Offerings
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              We bring together the essential elements of recruitment and career
              development to help individuals and organizations move forward.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
              },
              gap: 3,
            }}
          >
            {services.map((service, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid #e8edf3",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 30px rgba(23,43,77,0.08)",
                    borderColor: "secondary.main",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#edf3ff",
                    color: "secondary.main",
                    mb: 3,
                    "& svg": {
                      fontSize: 28,
                    },
                  }}
                >
                  {service.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={750}
                  color="primary.main"
                  mb={1.5}
                >
                  {service.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.9,
                    fontSize: 14,
                  }}
                >
                  {service.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Mission and Vision Section */}
      <Box
        sx={{
          py: { xs: 7, md: 10 },
          bgcolor: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 3,
            }}
          >
            {/* Mission */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                minHeight: 240,
              }}
            >
              <TrackChangesRoundedIcon
                sx={{ fontSize: 38, mb: 2, color: "#90b7ff" }}
              />

              <Typography variant="h5" fontWeight={750} mb={2}>
                Our Mission
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 2,
                }}
              >
                To empower individuals and organizations by making professional
                opportunities and talent connections more accessible, while
                supporting career growth and better recruitment experiences.
              </Typography>
            </Paper>

            {/* Vision */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: "secondary.light",
                minHeight: 240,
              }}
            >
              <VisibilityOutlinedIcon
                sx={{ fontSize: 38, mb: 2, color: "secondary.main" }}
              />

              <Typography
                variant="h5"
                fontWeight={750}
                color="primary.main"
                mb={2}
              >
                Our Vision
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "secondary.main",
                  lineHeight: 2,
                }}
              >
                To build a trusted platform where businesses discover talent,
                individuals unlock their potential, and meaningful professional
                relationships create opportunities for long-term growth.
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Our Values */}
      <Box
        sx={{
          bgcolor: "primary.light",
          py: { xs: 7, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              WHAT GUIDES US
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                mt: 1,
                fontSize: { xs: 28, md: 36 },
              }}
            >
              Our Core Values
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {values.map((value, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "secondary.light",
                    color: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    "& svg": {
                      fontSize: 28,
                    },
                  }}
                >
                  {value.icon}
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={750}
                  color="primary.main"
                  mb={1}
                >
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {value.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          bgcolor: "primary.main",
          py: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography
              variant="h3"
              fontWeight={800}
              color="#fff"
              sx={{
                fontSize: { xs: 28, md: 38 },
                mb: 2,
              }}
            >
              Let's Build Better Careers Together
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.9,
                maxWidth: 650,
                mx: "auto",
                mb: 4,
              }}
            >
              Whether you're looking for your next career opportunity or
              searching for the right talent for your organization, Suicul is
              here to help you take the next step.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/job_posts")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                Explore Opportunities
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleFindTalent}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.5)",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                Find Talent
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <FooterSection_1 />
    </Box>
  );
};

export default AboutPage;
