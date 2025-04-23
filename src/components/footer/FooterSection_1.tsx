import React from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const FooterSection_1 = () => {
  return (
    <Box
      className="footer-section-container"
      bgcolor={"secondary.main"}
      sx={{
        color: "#fff",
        pt: 8,
        pb: 4,
        px: { xs: 4, md: 10 },
      }}
    >
      <Grid container spacing={5}>
        {/* Logo & Description */}
        <Grid item xs={12} sm={6} md={3}>
          <Box>
            <img
              src="/logos/logo mono-01.svg"
              alt="logo"
              style={{ height: 80 }}
            />
            <Typography
              variant="body2"
              sx={{ mt: 2, maxWidth: "80%", opacity: 0.85 }}
            >
              Empowering job seekers and companies with powerful tools for
              hiring and growth.
            </Typography>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            {["Home", "Jobs", "Pricing", "About Us"].map((text, idx) => (
              <Link
                key={idx}
                href="#"
                underline="hover"
                color="inherit"
                sx={{
                  fontSize: "0.95rem",
                  opacity: 0.9,
                  "&:hover": { color: "#fbc02d", pl: 1 },
                  transition: "all 0.3s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Resources
          </Typography>
          <Stack spacing={1}>
            {["Help Center", "Blog", "Terms", "Privacy"].map((text, idx) => (
              <Link
                key={idx}
                href="#"
                underline="hover"
                color="inherit"
                sx={{
                  fontSize: "0.95rem",
                  opacity: 0.9,
                  "&:hover": { color: "#fbc02d", pl: 1 },
                  transition: "all 0.3s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Email: support@example.com
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            Phone: +1 (123) 456-7890
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <IconButton
              color="inherit"
              href="https://facebook.com"
              sx={{ "&:hover": { color: "#3b5998" } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://twitter.com"
              sx={{ "&:hover": { color: "#00acee" } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://linkedin.com"
              sx={{ "&:hover": { color: "#0e76a8" } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider & Footer Bottom */}
      <Divider sx={{ backgroundColor: "#444", my: 4 }} />
      <Typography
        align="center"
        variant="body2"
        sx={{ opacity: 0.6, fontSize: "0.875rem" }}
      >
        © {new Date().getFullYear()} Jobify. All rights reserved.
      </Typography>
    </Box>
  );
};

export default FooterSection_1;
