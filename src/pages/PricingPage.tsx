import { useEffect } from "react";

import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import Header_1 from "../components/header/Header_1";
import Header_2 from "../components/header/Header_2";
import Breadcrumb from "../components/common/Breadcrumb";
import FooterSection_1 from "../components/footer/FooterSection_1";
import { useAuth } from "../context/AuthContext";

const packages = [
  {
    title: "Basic",
    price: "$20/month",
    description: "For small businesses and occasional hiring needs",
    features: ["Post up to 2 active job listings per month", "30-day visibility per job post", "Basic applicant tracking (view & download applications only)", "Standard job listing placement (no priority in search results)", "Access to basic employer dashboard (manage jobs and applications)"
    ],
  },
  {
    title: "Standard",
    price: "$45/month",
    description: "Post up to 15 jobs per month with premium support.",
    features: [
      "15 Job Posts",
      "Premium Support",
      "Visible for 60 days",
      "Highlighted Listings",
    ],
  },
  {
    title: "Premium",
    price: "$70/month",
    description: "Unlimited job postings with dedicated account manager.",
    features: [
      "Unlimited Posts",
      "24/7 Support",
      "Visible for 90 days",
      "Top Placement",
      "Dedicated Manager",
    ],
  },
];

const PricingPage = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("Home", isAuthenticated);
  });

  return (
    <div>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}


      <Breadcrumb
        title="Pricing"
        description="Description about pricing pages"
        backgroundImage="/imgs/backgrounds/bg-6.jpg"
        path={[
          { label: "Home", href: "/" },
          { label: "Pricing" },
        ]}
      />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {packages.map((pkg, index) => (
            <Grid key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, textAlign: "center", p: 4, width: 350 }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {pkg.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{ my: 2, fontWeight: "bold" }}
                  >
                    {pkg.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {pkg.description}
                  </Typography>
                  {pkg.features.map((feature, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </CardContent>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Choose Plan
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <FooterSection_1 />
    </div>
  );
};

export default PricingPage;
