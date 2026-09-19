import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "@mui/icons-material";
import { JOB_CAT } from "../types/jobOptions";
import { LOCATION_DATA, CountryLocation } from "../types/locationOptions";

const HeroSection = () => {
  const keywords = ["Software Engineer", "Product Manager", "UX Designer"];

  const navigate = useNavigate();

  const [jobCategory, setJobCategory] = useState("");
  const [jobLocation, setJobLocation] = useState({
    country: "",
    province: "",
    city: "",
  });

  const cityOptions = LOCATION_DATA.flatMap((country) =>
    country.provinces.flatMap((province) =>
      province.cities.map((city) => ({
        city,
        province: province.name,
        country: country.name,
      })),
    ),
  );

  const handleSearch = () => {
    navigate("/job_posts", {
      state: {
        category: jobCategory,
        country: jobLocation.country,
        province: jobLocation.province,
        city: jobLocation.city,
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
              <Autocomplete
                fullWidth
                freeSolo
                options={JOB_CAT}
                value={jobCategory}
                onChange={(_event, newValue) => {
                  setJobCategory(newValue || "");
                }}
                onInputChange={(_event, newInputValue) => {
                  setJobCategory(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="What"
                    placeholder="Job category"
                    variant="outlined"
                    size="small"
                  />
                )}
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
              <Autocomplete
                fullWidth
                options={cityOptions}
                value={
                  cityOptions.find(
                    (option) => option.city === jobLocation.city,
                  ) || null
                }
                getOptionLabel={(option) => option.city}
                isOptionEqualToValue={(option, value) =>
                  option.city === value.city
                }
                onChange={(_event, newValue) => {
                  if (newValue) {
                    setJobLocation({
                      country: newValue.country,
                      province: newValue.province,
                      city: newValue.city,
                    });
                  } else {
                    setJobLocation({
                      country: "",
                      province: "",
                      city: "",
                    });
                  }
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box>
                      <Box sx={{ fontWeight: 500 }}>{option.city}</Box>

                      <Box
                        sx={{
                          fontSize: "12px",
                          color: "text.secondary",
                        }}
                      >
                        {option.province}, {option.country}
                      </Box>
                    </Box>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Where"
                    placeholder="City"
                    variant="outlined"
                    size="small"
                  />
                )}
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
