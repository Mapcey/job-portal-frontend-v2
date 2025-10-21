import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

const pricingPlans = [
  {
    title: "Basic",
    price: "$19",
    features: ["1 Job Post", "Basic Support", "Visible for 7 days"],
  },
  {
    title: "Pro",
    price: "$49",
    features: ["5 Job Posts", "Priority Support", "Visible for 30 days"],
    highlighted: true,
  },
  {
    title: "Enterprise",
    price: "$99",
    features: ["Unlimited Posts", "Dedicated Support", "Visible for 90 days"],
  },
];

const PricingSection = () => {
  return (
    <div className="pricing-section-container">
      <div className="pricing-section-content">
        <Typography
          variant="h3"
          className="pricing-section-title"
          align="center"
        >
          Our Pricing Plans
        </Typography>
        <Typography
          sx={{ marginTop: "10px", maxWidth: 600, marginX: "auto" }}
          variant="body1"
          align="center"
        >
          Choose a plan that suits your business needs and start hiring top
          talent today.
        </Typography>

        <Box sx={{ marginTop: 5 }}>
          <Grid container spacing={4} justifyContent="center">
            {pricingPlans.map((plan) => (
              <Grid
                
              >
                <Card
                  elevation={plan.highlighted ? 8 : 2}
                  sx={{
                    height: "100%", // ensures equal card heights
                    padding: { xs: 3, md: 7 },
                    borderRadius: 4,
                    backgroundColor: plan.highlighted ? "primary.main" : "#fff",
                    color: plan.highlighted ? "#fff" : "text.primary",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                      {plan.price}
                      <span style={{ fontSize: "16px" }}>/month</span>
                    </Typography>
                    {plan.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{ marginBottom: 1 }}
                      >
                        • {feature}
                      </Typography>
                    ))}
                    <Button
                      fullWidth
                      variant={plan.highlighted ? "contained" : "outlined"}
                      sx={{ marginTop: 3, borderRadius: 3 }}
                      color={plan.highlighted ? "secondary" : "primary"}
                    >
                      {plan.highlighted ? "Get Started" : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default PricingSection;
