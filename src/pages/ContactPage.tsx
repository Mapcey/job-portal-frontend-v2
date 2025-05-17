import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

import Header_1 from "../components/header/Header_1";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";

const ContactPage = () => {
  return (
    <div>
      <Header_1 />
      <Breadcrumb
        title={"Contact"}
        description={"page description here"}
        backgroundImage={"/imgs/backgrounds/bg-8.jpg"}
      />
      <div className="contact-page-content">
        <Box sx={{ backgroundColor: "#fafafa", py: 8 }}>
          <Container maxWidth="lg">
            {/* Section Heading */}
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="secondary.main"
                gutterBottom
              >
                Get in Touch
              </Typography>
              <Typography variant="body1" color="secondary.main">
                We're here to help you with any questions or feedback. Fill out
                the form and we'll get back to you shortly.
              </Typography>
            </Box>

            {/* Contact Form + Info */}
            <Grid
              container
              spacing={6}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {/* Form */}
              <Grid>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                  <form>
                    <Grid container spacing={3}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        className="text-input-3"
                      />

                      <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        className="text-input-3"
                      />

                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        size="small"
                        color="secondary"
                        className="text-input-3"
                      />

                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={5}
                        variant="outlined"
                        size="small"
                        color="secondary"
                      />

                      <Grid>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ borderRadius: 8, textTransform: "none", px: 4 }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Grid>

              {/* Contact Info */}
              <Grid>
                <Box sx={{ pl: { md: 4 }, pt: { xs: 4, md: 0 } }}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="secondary.main"
                    gutterBottom
                  >
                    Contact Information
                  </Typography>
                  <Typography variant="body2" color="secondary.main" mb={2}>
                    📍 Address: 123 Suicul Street, Career City, World
                  </Typography>
                  <Typography variant="body2" color="secondary.main" mb={2}>
                    📞 Phone: +1 (234) 567-890
                  </Typography>
                  <Typography variant="body2" color="secondary.main" mb={2}>
                    📧 Email: contact@suicul.com
                  </Typography>
                  <Typography variant="body2" color="secondary.main">
                    🕐 Working Hours: Mon - Fri: 9 AM - 6 PM
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <FooterSection_1 />
    </div>
  );
};

export default ContactPage;
