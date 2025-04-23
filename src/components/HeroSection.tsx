import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const HeroSection = () => {
  const keywords = ["Software Engineer", "Product Manager", "UX Designer"];
  return (
    <div className="hero-section-container">
      <div className="hero-section-right">
        <div className="hero-section-title">
          Find Your Career <br /> ti Make a Better Life
        </div>
        <div className="hero-section-sub-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum sed
          leo eget venenatis. Sed ullamcorper pulvinar lectus. Nulla at libero
          semper, pharetra arcu et, rutrum dui.
        </div>

        <div className="hero-section-buttons">
          <Button
            variant="contained"
            sx={{ borderRadius: 2, padding: "15px 10%", marginRight: "3%" }}
          >
            Post a Job
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              padding: "15px 10%",
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            See Our Jobs
          </Button>
        </div>

        <div className="search-container">
          <div className="search-content">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                // gap: 2,
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                flexWrap: "wrap", // Makes it responsive on smaller screens
              }}
            >
              <TextField
                label="What"
                variant="outlined"
                placeholder="Job title, keywords"
                className="search-input"
                InputLabelProps={{
                  sx: {
                    color: "black",
                    fontSize: 18,
                  },
                }}
                sx={{
                  // width: { xs: "100%", sm: "40%" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: "2px",
                  },
                }}
              />

              <TextField
                label="Where"
                variant="outlined"
                placeholder="City, state, or zip"
                className="search-input"
                InputLabelProps={{
                  sx: {
                    color: "black",
                    fontSize: 18,
                  },
                }}
                sx={{
                  // width: { xs: "100%", sm: "40%" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: "2px",
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                className="search-button"
                sx={{
                  height: "48px",
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  // width: { xs: "100%", sm: 130 },
                  marginLeft: 2,
                }}
              >
                Search
              </Button>
            </Box>
          </div>
          <div className="popular-keywords" style={{ paddingLeft: 10 }}>
            <p>
              <strong style={{ marginRight: 10 }}>Popupar Keywords:</strong>
              {keywords.map((keyword, index) => (
                <span key={index} className="popular-keywords-list">
                  {keyword}
                  {index < keywords.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="hero-section-left">
        <img src="/imgs/img1.jpg" alt="Hero" className="hero-section-image" />
      </div>
    </div>
  );
};

export default HeroSection;
