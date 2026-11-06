import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { useAuth } from "../context/AuthContext";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";

const ContactPage = () => {
  const { isAuthenticated } = useAuth();

  const contactDetails = [
    {
      icon: <LocationOnOutlinedIcon />,
      title: "Our Address",
      description: "123 Suicul Street, Career City, World",
    },
    {
      icon: <PhoneOutlinedIcon />,
      title: "Phone Number",
      description: "+44 7754 798027",
      link: "tel:+447754798027",
    },
    {
      icon: <EmailOutlinedIcon />,
      title: "Email Address",
      description: "grow@suicul.com",
      link: "mailto:grow@suicul.com",
    },
    {
      icon: <AccessTimeOutlinedIcon />,
      title: "Working Hours",
      description: "Monday – Friday, 9 AM – 6 PM",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Breadcrumb
        title="Contact Us"
        description="Have a question or need assistance? We'd love to hear from you."
        backgroundImage="/imgs/backgrounds/bg-8.jpg"
        path={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact Section */}
      <Box
        sx={{
          bgcolor: "#f7f9fc",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          {/* Section Heading */}
          <Box
            textAlign="center"
            maxWidth={650}
            mx="auto"
            mb={{ xs: 5, md: 7 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              GET IN TOUCH
            </Typography>

            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                mt: 1,
                mb: 2,
                color: "#172b4d",
                fontSize: { xs: "30px", md: "40px" },
              }}
            >
              We'd Love to Hear From You
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.8,
              }}
            >
              Whether you have a question about our services, need assistance
              with your account, or want to share feedback, our team is here to
              help.
            </Typography>
          </Box>

          {/* Main Contact Layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "0.85fr 1.4fr",
              },
              gap: { xs: 3, md: 4 },
              alignItems: "stretch",
            }}
          >
            {/* Contact Information */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "#172b4d",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative background */}
              <Box
                sx={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.045)",
                  top: -90,
                  right: -80,
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Contact Information
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.8,
                    mb: 5,
                  }}
                >
                  Feel free to reach out to us. We're always happy to assist you
                  and answer your questions.
                </Typography>

                <Stack spacing={3.5}>
                  {contactDetails.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          minWidth: 44,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                          bgcolor: "rgba(255,255,255,0.12)",
                          color: "#fff",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          sx={{ mb: 0.5 }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          component={item.link ? "a" : "p"}
                          href={item.link || undefined}
                          variant="body2"
                          sx={{
                            color: "rgba(255,255,255,0.72)",
                            lineHeight: 1.7,
                            textDecoration: "none",
                            overflowWrap: "anywhere",
                            "&:hover": item.link ? { color: "#fff" } : {},
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Box sx={{ mt: "auto", pt: 6 }}>
                  <Divider
                    sx={{
                      borderColor: "rgba(255,255,255,0.15)",
                      mb: 3,
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.8,
                    }}
                  >
                    We're committed to helping you make the most of your career
                    journey with Suicul.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Contact Form */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: 4,
                bgcolor: "#fff",
                border: "1px solid #e8edf3",
              }}
            >
              <Box mb={4}>
                <Typography
                  variant="h5"
                  fontWeight={750}
                  color="#172b4d"
                  gutterBottom
                >
                  Send Us a Message
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  Complete the form below and we'll get back to you as soon as
                  possible.
                </Typography>
              </Box>

              <form onSubmit={(e) => e.preventDefault()}>
                <Stack spacing={3}>
                  {/* Name and Email */}
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                      },
                      gap: 2.5,
                    }}
                  >
                    <TextField
                      fullWidth
                      required
                      name="name"
                      label="Your Name"
                      placeholder="Enter your name"
                      variant="outlined"
                      color="secondary"
                    />

                    <TextField
                      fullWidth
                      required
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      variant="outlined"
                      color="secondary"
                    />
                  </Box>

                  {/* Subject */}
                  <TextField
                    fullWidth
                    required
                    name="subject"
                    label="Subject"
                    placeholder="What is your inquiry about?"
                    variant="outlined"
                    color="secondary"
                  />

                  {/* Message */}
                  <TextField
                    fullWidth
                    required
                    name="message"
                    label="Your Message"
                    placeholder="Write your message here..."
                    multiline
                    rows={6}
                    variant="outlined"
                    color="secondary"
                  />

                  {/* Submit */}
                  <Box>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      endIcon={<SendRoundedIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        textTransform: "none",
                        fontSize: "15px",
                        boxShadow: "none",
                        "&:hover": {
                          boxShadow: "0 5px 15px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Container>
      </Box>

      <FooterSection_1 />
    </Box>
  );
};

export default ContactPage;
