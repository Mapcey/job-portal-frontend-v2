import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const cardData = [
  {
    title: "Design",
    description: "Explore creative roles in UI/UX, and product design.",
    image: "imgs/grid/design.jpg",
  },
  {
    title: "Development",
    description: "Find coding jobs from frontend to full-stack and beyond.",
    image: "imgs/grid/developing.jpg",
  },
  {
    title: "Marketing",
    description: "Jobs in SEO, digital marketing, and content strategy.",
    image: "imgs/grid/marketing.jpg",
  },
  {
    title: "Writing",
    description: "Copywriting, blogging, technical writing and more.",
    image: "imgs/grid/writing.jpg",
  },
  {
    title: "Finance",
    description: "Opportunities in accounting, analysis, and fintech.",
    image: "imgs/grid/finance.jpg",
  },
  {
    title: "Healthcare",
    description: "Medical, clinical, and support healthcare roles.",
    image: "imgs/grid/health.jpg",
  },
  {
    title: "Education",
    description: "Teaching, curriculum design, and e-learning jobs.",
    image: "imgs/grid/education.jpg",
  },
  {
    title: "Legal",
    description: "Legal assistants, attorneys, and compliance jobs.",
    image: "imgs/grid/legal.jpg",
  },
];

const CategorySection = () => {
  return (
    <div className="category-section-container">
      <div className="category-section-header">
        <h2>Choose Your Desired Category</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum sed
          leo eget venenatis. Sed ullamcorper pulvinar lectus.
        </p>
      </div>

      <div className="category-section-cards">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: 1200 }}
            justifyContent="center"
          >
            {cardData.map((card, index) => (
              <Grid key={index}>
                <Card className="card-container">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="170"
                      image={card.image}
                      alt={card.title}
                      sx={{ bgcolor: "primary.main" }}
                    />
                    <CardContent>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h6"
                        component="div"
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        align="center"
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      <div style={{}}></div>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "48px",
            borderRadius: 2,
            whiteSpace: "nowrap",
          }}
        >
          Browse All Categories
        </Button>
      </Box>
    </div>
  );
};

export default CategorySection;
