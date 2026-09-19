import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "@mui/icons-material";

const HeroSection = () => {
  const keywords = ["Software Engineer", "Product Manager", "UX Designer"];

  const navigate = useNavigate();

  const [jobCategory, setJobCategory] = useState("");
  const [jobCity, setJobCity] = useState("");

  const handleSearch = () => {
    navigate("/job_posts", {
      state: {
        category: jobCategory.trim(),
        city: jobCity.trim(),
      },
    });
  };

  return (
    <div className="hero-section-container">
      <div className="hero-section-right">
        <div className="hero-section-title">
          Find Your Career <br /> ti Make a Better Life
        </div>
        <div className="hero-section-sub-title">
          Discover the right opportunities, connect with great employers, and
          take the next step toward a career that matches your skills,
          experience, and goals.
        </div>

        <div className="hero-section-buttons">
          <Button
            variant="contained"
            sx={{ borderRadius: 2, padding: "15px 10%", marginRight: "3%" }}
            onClick={() => navigate("/employer/post")}
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
            onClick={() => navigate("/job_posts")}
          >
            See Our Jobs
          </Button>
        </div>

        <div className="search-container">
          <div className="search-content">
            <Box
              sx={{
                width: "100%",
                maxWidth: "1050px",
                margin: "0 auto",
                padding: { xs: 1, sm: 1.5 },
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                flexWrap: { xs: "wrap", md: "nowrap" },
              }}
            >
              {" "}
              {/* What */}{" "}
              <TextField
                fullWidth
                label="What"
                placeholder="Job category"
                variant="outlined"
                size="small"
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", md: "280px" },

                  "& .MuiOutlinedInput-root": {
                    height: "52px",
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",

                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },

                    "&:hover fieldset": {
                      borderColor: "#bdbdbd",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#555",
                    fontSize: "15px",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              {/* Where */}{" "}
              <TextField
                fullWidth
                label="Where"
                placeholder="City"
                variant="outlined"
                size="small"
                value={jobCity}
                onChange={(e) => setJobCity(e.target.value)}
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", md: "280px" },

                  "& .MuiOutlinedInput-root": {
                    height: "52px",
                    backgroundColor: "#fafafa",
                    borderRadius: "8px",

                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },

                    "&:hover fieldset": {
                      borderColor: "#bdbdbd",
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                  },

                  "& .MuiInputLabel-root": {
                    color: "#555",
                    fontSize: "15px",
                  },

                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              {/* Search Button */}{" "}
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{
                  height: "52px",
                  minWidth: { xs: "100%", md: "135px" },
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  boxShadow: "none",

                  "&:hover": {
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  },
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
