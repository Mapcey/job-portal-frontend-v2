import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";
import { useAuth } from "../context/AuthContext";

import {
  employerPricingPlans,
  seekerPricingPlans,
} from "../assets/data/pricePlane";

const PricingPage = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  const isEmployer = userRole === "employer";
  const isSeeker = userRole === "seeker";

  // Guests see employer pricing by default.
  const plans = isSeeker ? seekerPricingPlans : employerPricingPlans;

  const pageTitle = isSeeker ? "Job Seeker Plans" : "Employer Pricing Plans";

  const pageDescription = isSeeker
    ? "Explore opportunities and take the next step in your career."
    : "Choose the right plan to find talent and grow your team.";

  const handleChoosePlan = (planTitle: string) => {
    // Job seekers do not need an employer subscription.
    if (isSeeker) {
      navigate(isAuthenticated ? "/job_posts" : "/login");
      return;
    }

    // Guests must log in before purchasing an employer plan.
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Only employers should purchase employer plans.
    if (isEmployer) {
      navigate(
        `/employer/subscription-upload?plan=${encodeURIComponent(planTitle)}`,
      );
    }
  };

  return (
    <Box>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Breadcrumb
        title="Pricing"
        description={pageDescription}
        backgroundImage="/imgs/backgrounds/bg-6.jpg"
        path={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.7rem" },
            }}
          >
            {pageTitle}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, maxWidth: 650, mx: "auto", lineHeight: 1.8 }}
          >
            {isSeeker
              ? "Create your profile, discover job opportunities, and manage your applications."
              : "Compare our recruitment packages and choose the right option for your hiring needs."}
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {plans.map((plan, index) => (
            <Grid key={plan.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "visible",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor:
                    index === 1 && !isSeeker ? "primary.main" : "grey.200",
                  boxShadow:
                    index === 1 && !isSeeker
                      ? "0 12px 36px rgba(243, 109, 0, 0.12)"
                      : "0 4px 20px rgba(0, 0, 0, 0.04)",
                  bgcolor: "#fff",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 36px rgba(0, 0, 0, 0.09)",
                  },
                }}
              >
                {/* Recommended plan label */}
                {index === 1 && !isSeeker && (
                  <Chip
                    label="MOST POPULAR"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -13,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: 800,
                      fontSize: "0.68rem",
                      letterSpacing: 0.8,
                      px: 1,
                      height: 27,
                      borderRadius: 2,
                    }}
                  />
                )}

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 3, md: 3.5 },
                    "&:last-child": { pb: { xs: 3, md: 3.5 } },
                  }}
                >
                  {/* Plan title and description */}
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 750,
                      letterSpacing: "-0.5px",
                      color: "text.primary",
                    }}
                  >
                    {plan.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      minHeight: 44,
                      lineHeight: 1.7,
                    }}
                  >
                    {plan.description}
                  </Typography>

                  {/* Price section */}
                  <Box
                    sx={{
                      mt: 3,
                      mb: 3,
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: index === 1 && !isSeeker ? "#fff1e5" : "#f8fafc",
                      border: "1px solid",
                      borderColor:
                        index === 1 && !isSeeker ? "#ffe0c2" : "#edf0f3",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 700,
                        letterSpacing: 1,
                        lineHeight: 1.5,
                      }}
                    >
                      {isSeeker ? "YOUR PLAN" : "PLAN PRICE"}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: { xs: "1.8rem", md: "2rem" },
                        lineHeight: 1.3,
                        fontWeight: 800,
                        letterSpacing: "-1px",
                        color: "primary.main",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {plan.price}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {isSeeker
                        ? "Start exploring opportunities"
                        : "Choose the right fit for your hiring needs"}
                    </Typography>
                  </Box>

                  {/* Features */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 750, mb: 1.5 }}
                  >
                    What's included
                  </Typography>

                  <List disablePadding sx={{ flexGrow: 1 }}>
                    {plan.features.map((feature) => (
                      <ListItem
                        key={feature}
                        disableGutters
                        sx={{
                          alignItems: "flex-start",
                          py: 1,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 30,
                            mt: "2px",
                            color: "primary.main",
                          }}
                        >
                          <CheckCircleOutlineIcon fontSize="small" />
                        </ListItemIcon>

                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                            lineHeight: 1.65,
                            color: "text.secondary",
                          }}
                          sx={{ my: 0 }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ mt: 2.5, mb: 2.5, borderColor: "grey.100" }} />

                  {/* CTA */}
                  <Button
                    fullWidth
                    variant={
                      index === 1 && !isSeeker ? "contained" : "outlined"
                    }
                    onClick={() => handleChoosePlan(plan.title)}
                    endIcon={<CheckCircleOutlineIcon />}
                    sx={{
                      minHeight: 48,
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      borderWidth: 1.5,
                      boxShadow: "none",
                      "&:hover": {
                        borderWidth: 1.5,
                        boxShadow:
                          index === 1 && !isSeeker
                            ? "0 5px 14px rgba(243, 109, 0, 0.2)"
                            : "none",
                      },
                    }}
                  >
                    {isSeeker ? "Browse Jobs" : "Choose Plan"}
                  </Button>

                  <Typography
                    variant="caption"
                    color="text.disabled"
                    align="center"
                    sx={{ mt: 1.5, lineHeight: 1.5 }}
                  >
                    {isSeeker
                      ? "Start your job search today"
                      : "Review your plan before proceeding"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <FooterSection_1 />
    </Box>
  );
};

export default PricingPage;
