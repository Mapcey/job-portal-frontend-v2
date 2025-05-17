import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";

import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

const dummyJobs = [
  {
    id: 1,
    name: "Saman Kumara",
    company: "Engineer",
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
    name: "Saman Kumara",
    company: "Developer",
    desc: " blanditiis tenetur unde suscipit, quam beatae rerum inventore. blanditiis tenetur unde suscipit, quam beatae rerum inventore",
    chips: {
      salary: "70K - 90K",
      education: "Bachelor's",
      location: "Colombo",
    },
  },
  {
    id: 3,
    name: "Saman Kumara",
    company: "Analyst",
    desc: " blanditiis tenetur unde suscipit, quam beatae rerum inventore. blanditiis tenetur unde suscipit, quam beatae rerum inventore",
    chips: {
      salary: "60K - 80K",
      education: "Master's",
      location: "Kandy",
    },
  },
];

const ManageCandidatesTab = () => {
  const [appliedCandidates, setAppliedCandidates] = useState(dummyJobs);

  const handleRemove = (id: number) => {
    const updatedJobs = appliedCandidates.filter((job) => job.id !== id);
    setAppliedCandidates(updatedJobs);
  };

  return (
    <Box className="saved-jobs-tab-container" sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Applied Candidates ({appliedCandidates.length})
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
        {appliedCandidates.map((job) => (
          <Card
            key={job.id}
            variant="outlined"
            sx={{
              position: "relative",
              paddingTop: "20px",
              marginBottom: "20px",
            }}
          >
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
              <PersonRemoveAlt1Icon />
            </IconButton>
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">{job.name}</Typography>
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

        {appliedCandidates.length === 0 && (
          <Typography variant="h3" color="secondary.light">
            No Applications yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ManageCandidatesTab;
