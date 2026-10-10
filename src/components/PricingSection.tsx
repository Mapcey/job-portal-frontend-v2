import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const pricingBenefits = [
  {
    icon: <WorkOutlineIcon fontSize="large" />,
    title: "Flexible Hiring Options",
    description:
      "Explore plans designed to support businesses of different sizes and hiring needs.",
  },
  {
    icon: <GroupsOutlinedIcon fontSize="large" />,
    title: "Reach the Right Candidates",
    description:
      "Connect with job seekers and find suitable talent for your open positions.",
  },
  {
    icon: <CheckCircleOutlineIcon fontSize="large" />,
    title: "Simple and Transparent",
    description:
      "Compare available packages and choose the option that works best for your recruitment goals.",
  },
];

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="pricing-section-container"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        className="pricing-section-content"
        sx={{ maxWidth: 1200, mx: "auto" }}
      >
        <Typography
          variant="overline"
          align="center"
          display="block"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          PRICING &amp; PLANS
        </Typography>

        <Typography
          variant="h3"
          className="pricing-section-title"
          align="center"
          sx={{
            mt: 1,
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.7rem" },
          }}
        >
          Find the Right Plan for Your Hiring Needs
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 2,
            maxWidth: 680,
            mx: "auto",
            color: "text.secondary",
            lineHeight: 1.8,
          }}
        >
          Whether you're hiring for one position or building a growing team,
          explore our pricing options and find the right solution for your
          recruitment goals.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 4 }} justifyContent="center">
          {pricingBenefits.map((benefit) => (
            <Grid key={benefit.title} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                    borderColor: "primary.light",
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 2,
                      mb: 2,
                      borderRadius: 3,
                      color: "primary.main",
                      bgcolor: "#fff1e5",
                    }}
                  >
                    {benefit.icon}
                  </Box>

                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {benefit.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<PaymentsOutlinedIcon />}
            onClick={() => navigate("/pricing")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            View Pricing Plans
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Compare plans and choose what works for your business.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingSection;
