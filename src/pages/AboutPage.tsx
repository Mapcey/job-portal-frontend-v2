import { Box, Container, Typography, Divider } from "@mui/material";

import Header_1 from "../components/header/Header_1";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";

const AboutPage = () => {
  return (
    <div>
      <Header_1 />
      <Breadcrumb
        title={"About Us"}
        description={"this is the page description"}
        backgroundImage={"imgs/backgrounds/bg-7.jpg"}
      />
      <Box sx={{ backgroundColor: "#fafafa", py: 8 }}>
        <Container maxWidth="lg">
          {/* Introduction */}
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="secondary.main"
              gutterBottom
            >
              Welcome to Suicul
            </Typography>
            <Typography
              variant="body1"
              color="secondary.main"
              maxWidth="700px"
              mx="auto"
            >
              At Suicul, we revolutionize the way people find jobs and companies
              discover talents. Our mission is to build meaningful connections
              that shape futures.
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 6 }} />

          {/* Mission, Vision, Values */}

          <Box textAlign="center" mb={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              color="secondary.main"
            >
              Our Mission
            </Typography>
            <Typography variant="body2" color="secondary.main">
              Empower individuals to achieve their career dreams by providing a
              seamless, supportive, and innovative job platform.
            </Typography>
          </Box>

          <Box textAlign="center" mb={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              color="secondary.main"
            >
              Our Vision
            </Typography>
            <Typography variant="body2" color="secondary.main">
              To become the global leader in career development, helping
              millions unlock their potential and build fulfilling futures.
            </Typography>
          </Box>

          <Box textAlign="center" mb={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              mb={2}
              color="secondary.main"
            >
              Our Values
            </Typography>
            <Typography variant="body2" color="secondary.main">
              Integrity, Innovation, Diversity, Excellence, and Empathy — these
              are the cornerstones of Suicul's culture.
            </Typography>
          </Box>

          {/* Final CTA */}
          <Box textAlign="center" mt={10}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="secondary.main"
              gutterBottom
            >
              Join the Suicul Journey
            </Typography>
            <Typography
              variant="body1"
              color="secondary.main"
              maxWidth="600px"
              mx="auto"
            >
              Whether you are looking for your dream job or seeking the perfect
              candidate, Suicul is here to help you every step of the way.
            </Typography>
          </Box>
        </Container>
      </Box>
      <FooterSection_1 />
    </div>
  );
};

export default AboutPage;
