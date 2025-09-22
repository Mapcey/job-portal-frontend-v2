import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getSeekerData, getSeekerFiles } from "../../services/APIs/APIs";
import { SEEKER_DATA, seekerFiles } from "../../types/users";
import { useAuth } from "../../context/AuthContext";

const SeekerProfileTab = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [seekerID, setSeekerID] = useState(0);
  const [user, setUser] = useState<SEEKER_DATA | null>(null);
  const [files, setFiles] = useState<seekerFiles[] | null>(null);

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) {
      setSeekerID(userInfo.UserId);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (seekerID !== 0) {
        try {
          const data = await getSeekerData(seekerID.toString());
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch seeker data:", error);
        }
        try {
          const filesData = await getSeekerFiles(seekerID.toString());
          setFiles(Array.isArray(filesData) ? filesData : [filesData]);
        } catch (error) {
          console.error("Failed to fetch seeker files:", error);
        }
      }
    };
    fetchData();
  }, [seekerID]);

  const SectionBox: React.FC<{ title?: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );

  return (
    <div className="seeker-profile-tab-container">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate("edit")}
        >
          Edit Profile
        </Button>
      </Box>

      <div className="seeker-profile-tab-content">
        {/* Profile Photo + CV */}
        <SectionBox>
          {files && files.length > 0 && (() => {
            const getLatestByType = (regex: RegExp) =>
              ([...files]
                .filter((f) => regex.test(f.file_name))
                .sort(
                  (a, b) =>
                    new Date(b.uploaded_at).getTime() -
                    new Date(a.uploaded_at).getTime()
                )[0] || null);

            const latestImage = getLatestByType(/\.(jpg|jpeg|png)$/i);
            const latestCV = getLatestByType(/\.(pdf|docx)$/i);

            return (
              <Box sx={{ display: "flex", gap: 2 }}>
                {latestImage && (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f0f0f0",
                    border: "4px solid #1976d2" // <— add border here
                  }}
                >
                  <img
                    src={latestImage.file_url}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

                {latestCV && (
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 1,
                      backgroundColor: "#fafafa",
                      alignSelf: "center",
                    }}
                  >
                    <a
                      href={latestCV.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#d18024ff" }}
                    >
                      Download CV
                    </a>
                  </Box>
                )}
              </Box>
            );
          })()}
        </SectionBox>

        {/* Basic Info */}
        <SectionBox>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography variant="h4">{user?.FirstName + " "+ user?.LastName || ""}</Typography>
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
          <Box sx={{ display: "flex", mt: 1, gap: 1, flexWrap: "wrap" }}>
            <Chip label="Colombo" variant="outlined" />
            <Chip
              label={
                "Experience: " + (user?.ProfessionalExperience || 0) + " years"
              }
              variant="outlined"
            />
            <Chip label={user?.JobType || ""} variant="outlined" />
            <Chip label={user?.JobType2 || ""} variant="outlined" />
          </Box>
          <Box sx={{ display: "flex", mt: 1, gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={
                "Expected salary(" +
                user?.Currency +
                "): " +
                user?.MinSalary +
                " - " +
                user?.MaxSalary
              }
              variant="outlined"
            />
            {user?.languages && user.languages.length > 0 && (
              <Chip
                label={
                  user.languages.find((l) => l.ExpertLevel === "Fluent")
                    ? `Fluent: ${
                        user.languages.find((l) => l.ExpertLevel === "Fluent")
                          ?.Language
                      }`
                    : `Fluent: ${user.languages[0].Language}`
                }
                variant="outlined"
              />
            )}
            <Chip
              label={
                user?.DateOfBirth
                  ? new Date(user.DateOfBirth).toLocaleDateString()
                  : ""
              }
              variant="outlined"
            />
          </Box>
        </SectionBox>

        {/* Social Links */}
        <SectionBox title="Social links">
          <Typography variant="subtitle1">
            <a
              href={user?.SocialLinks || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.SocialLinks}
            </a>
          </Typography>
        </SectionBox>

        {/* Address */}
        <SectionBox title="Address">
          <Typography variant="subtitle1">{user?.Address || ""}</Typography>
        </SectionBox>

        {/* Professional Summary */}
        <SectionBox title="Professional Summary">
          <Typography variant="subtitle1">{user?.Summary || ""}</Typography>
        </SectionBox>

        {/* Career History */}
        <SectionBox title="Career History">
          {user?.careers && user.careers.length > 0 ? (
            user.careers.map((career) => (
              <Box key={career.id} mb={2}>
                <Typography variant="h6">{career.Designation}</Typography>
                <Typography variant="subtitle2">{career.CompanyName}</Typography>
                <Typography variant="body2">
                  {career.StartDate} - {career.EndDate || "Present"}
                </Typography>
                <Typography variant="body1">{career.Description}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No career history available.</Typography>
          )}
        </SectionBox>

        {/* Education */}
        <SectionBox title="Education">
          {user?.educations && user.educations.length > 0 ? (
            user.educations.map((edu) => (
              <Box key={edu.id} mb={2}>
                <Typography variant="h6">{edu.InstituteName}</Typography>
                <Typography variant="subtitle2">{edu.FieldOfStudy}</Typography>
                <Typography variant="body2">
                  {edu.StartDate} - {edu.EndDate || "Present"}
                </Typography>
                <Typography variant="body2">
                  {edu.LevelOfStudy} {edu.Status ? `(${edu.Status})` : ""}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No education history available.</Typography>
          )}
        </SectionBox>

        {/* Skills and Languages */}
        <SectionBox title="Skills">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={`${skill.Skill} (${skill.ExpertLevel})`}
                  variant="outlined"
                />
              ))
            ) : (
              <Typography variant="body2">No skills available.</Typography>
            )}
          </Box>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Languages
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {user?.languages && user.languages.length > 0 ? (
              user.languages.map((lang) => (
                <Chip
                  key={lang.id}
                  label={`${lang.Language} (${lang.ExpertLevel})`}
                  variant="outlined"
                />
              ))
            ) : (
              <Typography variant="body2">No languages available.</Typography>
            )}
          </Box>
        </SectionBox>
      </div>
    </div>
  );
};

export default SeekerProfileTab;
