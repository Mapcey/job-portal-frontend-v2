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
      bgcolor="secondary.main"
      sx={{
        color: "#fff",
        pt: 6,
        pb: 3,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid container spacing={5}>
        {/* Logo & Description */}
        <Grid item xs={12} md={4}>
          <Box>
            <img
              src="/logos/logo mono-01.svg"
              alt="logo"
              style={{ height: 60 }}
            />
            <Typography
              variant="body2"
              sx={{ mt: 2, maxWidth: 320, opacity: 0.8, lineHeight: 1.6 }}
            >
              Empowering job seekers and companies with smart tools for hiring
              and growth.
            </Typography>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Quick Links
          </Typography>
          <Stack spacing={0.8}>
            {["Home", "Jobs", "Pricing", "About Us"].map((text, idx) => (
              <Link
                key={idx}
                href="#"
                underline="none"
                color="inherit"
                sx={{
                  fontSize: "0.9rem",
                  opacity: 0.85,
                  "&:hover": { color: "primary.light", pl: 0.5 },
                  transition: "all 0.25s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Resources */}
        <Grid item xs={6} md={2}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Resources
          </Typography>
          <Stack spacing={0.8}>
            {["Help Center", "Blog", "Terms", "Privacy"].map((text, idx) => (
              <Link
                key={idx}
                href="#"
                underline="none"
                color="inherit"
                sx={{
                  fontSize: "0.9rem",
                  opacity: 0.85,
                  "&:hover": { color: "primary.light", pl: 0.5 },
                  transition: "all 0.25s",
                }}
              >
                {text}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Contact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            support@example.com
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            +1 (123) 456-7890
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
            {[
              {
                icon: <FacebookIcon />,
                color: "#3b5998",
                link: "https://facebook.com",
              },
              {
                icon: <TwitterIcon />,
                color: "#00acee",
                link: "https://twitter.com",
              },
              {
                icon: <LinkedInIcon />,
                color: "#0e76a8",
                link: "https://linkedin.com",
              },
            ].map((social, idx) => (
              <IconButton
                key={idx}
                color="inherit"
                href={social.link}
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": { bgcolor: social.color, color: "#fff" },
                  transition: "all 0.3s",
                  width: 36,
                  height: 36,
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Divider & Footer Bottom */}
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.15)", my: 3 }} />
      <Typography
        align="center"
        variant="body2"
        sx={{ opacity: 0.6, fontSize: "0.8rem" }}
      >
        © {new Date().getFullYear()} Jobify. All rights reserved.
      </Typography>
    </Box>
  );
};

export default FooterSection_1;
