import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Chip,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const SeekerProfileTab = () => {
  const [skills, setSkills] = useState<string[]>(["React", "Python", "SQL"]);
  const navigate = useNavigate();

  return (
    <div className="seeker-profile-tab-container">
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate("edit")}
        >
          Edit Profile
        </Button>
      </Box>
      <div className="seeker-profile-tab-content">
        {/* section */}
        <div className="seeker-profile-section-1">
          <img
            title="profile image"
            height={"100px"}
            className="seeker-profile-tab-image"
            src="/imgs/people/p2.jpg"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
              <Box>
                <Typography variant="h4">Isuru Prasad</Typography>
                <Typography variant="subtitle1">Software Engineer</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Phone Number</Typography>
                <Typography variant="subtitle1">011 22334455</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Email</Typography>
                <Typography variant="subtitle1">isuru@email.com</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
              <Chip label="Bachelor's" variant="outlined" />
              <Chip label="Colombo" variant="outlined" />
              <Chip label="3 - 5 Years" variant="outlined" />
              <Chip label="Hybrid" variant="outlined" />
            </Box>
            <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
              <Chip label="Rs 50k - 75K" variant="outlined" />
              <Chip label="English" variant="outlined" />
              <Chip label="25-30 Yrs" variant="outlined" />
            </Box>
          </Box>
        </div>

        {/* section */}
        <div className="seeker-profile-section-2">
          <Typography variant="h6">Professional Summary</Typography>
          <Box className="seeker-profile-text-area-container">
            <Typography
              className="seeker-profile-text-area"
              variant="subtitle1"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus,
            </Typography>
          </Box>
        </div>

        {/* section */}
        <div className="seeker-profile-section-2">
          <Typography variant="h6">Career History</Typography>
          <Box className="seeker-profile-text-area-container">
            <Typography ml={2} mt={2} variant="h6">
              Software Engineer
            </Typography>
            <Typography ml={2} variant="subtitle2">
              ABC Company
            </Typography>
            <Typography className="seeker-profile-text-area" variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus,
            </Typography>
          </Box>
        </div>

        {/* section */}
        <div className="seeker-profile-section-2">
          <Typography variant="h6">Education</Typography>
          <Box className="seeker-profile-text-area-container">
            <Typography ml={2} mt={2} variant="h6">
              ABC University
            </Typography>
            <Typography ml={2} variant="subtitle2">
              B.Sc. Software Engineering
            </Typography>
            <Typography className="seeker-profile-text-area" variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus,
            </Typography>
          </Box>
        </div>

        <div className="seeker-profile-section-2">
          <Typography variant="h6">Skills</Typography>
          <Autocomplete
            disabled
            sx={{ marginTop: "0" }}
            className="text-input-1"
            multiple
            freeSolo
            options={[]} // No predefined options, user can type freely
            value={skills}
            onChange={(event, newValue) => {
              console.log(event);
              setSkills(newValue);
            }}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Add Skills" />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SeekerProfileTab;
