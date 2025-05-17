import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
  Grid,
} from "@mui/material";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const dummyJobs = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `City ${i + 1}`,
  description: `This is a short description for job  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, ${i + 1}.`,
}));

const RecentJobsSection = () => {
  const [page, setPage] = useState(1);
  const jobsPerPage = 6;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const displayedJobs = dummyJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  return (
    <div className="recent-jobs-section-container">
      <div className="recent-jobs-section-content">
        <Typography
          variant="h4"
          textAlign={"center"}
          className="recent-jobs-title"
        >
          Browse Recent Jobs
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          className="recent-jobs-title"
          sx={{ width: "50%", marginTop: "10px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus,
        </Typography>

        <div className="recent-jobs-section-cards">
          <Grid container spacing={3} justifyContent="center">
            {displayedJobs.map((job) => (
              <Grid key={job.id || job.title}>
                <Card
                  sx={{ width: "500px", borderRadius: "10px" }}
                  variant="outlined"
                >
                  <CardActions sx={{ justifyContent: "right" }}>
                    <Button size="small">Details</Button>
                    <Button variant="contained" sx={{ borderRadius: "10px" }}>
                      Apply
                    </Button>
                  </CardActions>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company} — {job.location}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {job.description}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" m={2} spacing={1}>
                    <Chip
                      sx={{ bgcolor: "secondary.light" }}
                      size="small"
                      label="Rs. 50k - 75k"
                    />
                    <Chip
                      sx={{ bgcolor: "secondary.light" }}
                      size="small"
                      label="Bachelor's"
                    />
                    <Chip
                      sx={{ bgcolor: "secondary.light" }}
                      size="small"
                      label="Colombo"
                    />
                    <Chip
                      sx={{ bgcolor: "secondary.light" }}
                      size="small"
                      label="Fulltime"
                    />
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={Math.ceil(dummyJobs.length / jobsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentJobsSection;
