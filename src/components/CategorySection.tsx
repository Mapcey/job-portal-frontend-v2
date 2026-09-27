import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { JOB_CATEGORY_GROUPS } from "../types/jobOptions";

const cardData = [
  {
    title: "Business, Finance & Administration",
    description:
      "Explore opportunities in finance, administration, HR, consulting, and business management.",
    image: "imgs/grid/finance.jpg",
  },
  {
    title: "Technology, Science & Engineering",
    description:
      "Find careers in software, engineering, science, biotechnology, and telecommunications.",
    image: "imgs/grid/developing.jpg",
  },
  {
    title: "Construction, Property & Trades",
    description:
      "Discover jobs in construction, architecture, property, automotive, and skilled trades.",
    image: "imgs/grid/design.jpg",
  },
  {
    title: "Sales, Marketing & Customer Services",
    description:
      "Explore careers in sales, marketing, retail, customer service, and call centres.",
    image: "imgs/grid/marketing.jpg",
  },
  {
    title: "Healthcare, Care & Community Services",
    description:
      "Find opportunities in healthcare, social work, community services, and personal care.",
    image: "imgs/grid/health.jpg",
  },
  {
    title: "Public Sector, Security & Environment",
    description:
      "Explore careers in government, security, defence, environment, agriculture, and energy.",
    image: "imgs/grid/legal.jpg",
  },
  {
    title: "Education, Creative & Media",
    description:
      "Discover jobs in education, creative industries, media, writing, and translation.",
    image: "imgs/grid/education.jpg",
  },
  {
    title: "Hospitality, Transport & Recreation",
    description:
      "Find opportunities in tourism, logistics, transport, sports, recreation, and more.",
    image: "imgs/grid/writing.jpg",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTitle: string) => {
    const selectedCategory = JOB_CATEGORY_GROUPS.find(
      (category) => category.name === categoryTitle,
    );

    if (!selectedCategory) {
      return;
    }

    navigate("/job_posts", {
      state: {
        categories: selectedCategory.subcategories,
      },
    });
  };

  return (
    <div className="category-section-container">
      <div className="category-section-header">
        <h2>Choose Your Desired Category</h2>
        <p>
          Explore job opportunities across different industries and professional
          fields.
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
                  <CardActionArea
                    onClick={() => handleCategoryClick(card.title)}
                  >
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "48px",
            borderRadius: 2,
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            navigate("/job_posts");
          }}
        >
          Browse All Categories
        </Button>
      </Box>
    </div>
  );
};

export default CategorySection;
