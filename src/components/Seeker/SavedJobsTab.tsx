import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";

import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    test: "ss",
    desc: " blanditiis tenetur unde suscipit, quam beatae rerum inventore. blanditiis tenetur unde suscipit, quam beatae rerum inventore",
    chips: {
      salary: "50K - 70K",
      education: "Bachelor's",
      location: "Remote",
    },
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSoft",
    desc: " blanditiis tenetur unde suscipit, quam beatae rerum inventore. blanditiis tenetur unde suscipit, quam beatae rerum inventore",
    chips: {
      salary: "70K - 90K",
      education: "Bachelor's",
      location: "Colombo",
    },
  },
  {
    id: 3,
    title: "GIS Analyst",
    company: "GeoMapping Ltd",
    desc: " blanditiis tenetur unde suscipit, quam beatae rerum inventore. blanditiis tenetur unde suscipit, quam beatae rerum inventore",
    chips: {
      salary: "60K - 80K",
      education: "Master's",
      location: "Kandy",
    },
  },
];

const SavedJobsTab = () => {
  const [savedJobs, setSavedJobs] = useState(dummyJobs);

  const handleRemove = (id: number) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updatedJobs);
  };

  return (
    <Box className="saved-jobs-tab-container" sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Saved Jobs ({savedJobs.length})
      </Typography>

      <Box
        className="saved-jobs-tab-content"
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          // display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {savedJobs.map((job) => (
          <Card
            key={job.id}
            variant="outlined"
            sx={{
              position: "relative",
              paddingTop: "20px",
              marginBottom: "20px",
            }}
          >
            <CardActionArea>
              {/* Remove icon */}
              <IconButton
                size="small"
                onClick={() => handleRemove(job.id)}
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  zIndex: 1,
                  backgroundColor: "white",
                  boxShadow: 1,
                  ":hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <BookmarkRemoveIcon />
              </IconButton>

              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography mb={3} color="secondary">
                  {job.company}
                </Typography>

                <Typography variant="body1">{job.desc}</Typography>

                {/* Chips */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  {Object.entries(job.chips).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${value}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

        {savedJobs.length === 0 && (
          <Typography variant="h3" color="secondary.light">
            No saved jobs yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SavedJobsTab;
