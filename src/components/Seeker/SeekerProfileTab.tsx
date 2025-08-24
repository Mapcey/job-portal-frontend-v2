import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { getSeekerData } from "../../services/APIs/APIs";
import { SEEKER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";

const SeekerProfileTab = () => {
  const navigate = useNavigate();

const { userInfo } = useAuth();
const [seekerID, setSeekerID] = useState(0);
const [user, setUser] = useState<SEEKER_DATA | null>(null);

 useEffect(() => {
    if (userInfo && "UserId" in userInfo) {
      setSeekerID(userInfo.UserId);
      console.log(userInfo.UserId);
    }
  }, [userInfo]);

  useEffect(() => {
      const fetchData = async () => {
        if (seekerID !== 0) {
          try {
            const data = await getSeekerData(seekerID.toString());
            setUser(data);
            console.log("Seeker data fetched:", data);
          } catch (error) {
            console.error("Failed to fetch employer data:", error);
          }
        }
      };
  
      fetchData();
    }, [seekerID]);

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
                <Typography variant="h4">{user?.FirstName || ""}</Typography>
                <Typography variant="subtitle1">Software Engineer</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Phone No</Typography>
                <Typography variant="subtitle1">{user?.ContactNo}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Email</Typography>
                <Typography variant="subtitle1">{user?.Email || ""}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
              <Chip label="Colombo" variant="outlined" />
              <Chip label={'Experence: '+user?.ProfessionalExperience + 'years' || ""} variant="outlined" />
              <Chip label={user?.JobType || ""} variant="outlined" />
              <Chip label={user?.JobType2 || ""} variant="outlined" />
            </Box>
            <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
              <Chip label={user?.Salary || ""} variant="outlined" />
              {user?.languages && user.languages.length > 0 && (
                <Chip
                  label={
                    user.languages.find(l => l.ExpertLevel === "Fluent")
                      ? `Fluent: ${user.languages.find(l => l.ExpertLevel === "Fluent")?.Language}`
                      : `Fluent: ${user.languages[0].Language}`
                  }
                  variant="outlined"
                />
              )}
              <Chip label={user?.DateOfBirth.toString() || ""} variant="outlined" />
              
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
              {user?.Summary || ""}
            </Typography>
          </Box>
        </div>

        {/* section */}
        <div className="seeker-profile-section-2">
          <Typography variant="h6">Career History</Typography>
          <Box className="seeker-profile-text-area-container">
            {user?.careers && user.careers.length > 0 ? (
              user.careers.map((career) => (
                <Box key={career.id} mb={2}>
                  <Typography ml={2} mt={2} variant="h6">
                    {career.Designation}
                  </Typography>
                  <Typography ml={2} variant="subtitle2">
                    {career.CompanyName}
                  </Typography>
                  <Typography ml={2} variant="body2">
                    {career.StartDate} - {career.EndDate ? career.EndDate : "Present"}
                  </Typography>
                  <Typography className="seeker-profile-text-area" variant="body1">
                    {career.Description}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography ml={2} variant="body2">
                No career history available.
              </Typography>
            )}
            </Box>
        </div>

        {/* section */}
        <div className="seeker-profile-section-2">
          <Typography variant="h6">Education</Typography>
          <Box className="seeker-profile-text-area-container">
            {user?.educations && user.educations.length > 0 ? (
              user.educations.map((edu) => (
                <Box key={edu.id} mb={2}>
                  <Typography ml={2} mt={2} variant="h6">
                    {edu.InstituteName}
                  </Typography>
                  <Typography ml={2} variant="subtitle2">
                    {edu.FieldOfStudy}
                  </Typography>
                  <Typography ml={2} variant="body2">
                    {edu.StartDate} - {edu.EndDate ? edu.EndDate : "Present"}
                  </Typography>
                  <Typography ml={2} variant="body2">
                    {edu.LevelOfStudy} {edu.Status ? `(${edu.Status})` : ""}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography ml={2} variant="body2">
                No education history available.
              </Typography>
            )}
          </Box>
        </div>

        <div className="seeker-profile-section-2">
          <Typography variant="h6">Skills</Typography>
          <Box className="seeker-profile-text-area-container" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={`${skill.Skill} (${skill.ExpertLevel})`}
                  variant="outlined"
                />
              ))
            ) : (
              <Typography ml={2} variant="body2">
                No skills available.
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfileTab;
