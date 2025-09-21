import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";

import { getSeekerData } from "../../services/APIs/APIs"; // assume you have an API function
import { SEEKER_DATA } from "../../types/users";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";

const SeekerPublicViewPage = () => {
  const { seekerID } = useParams<{ seekerID: string }>();
  const [seeker, setSeeker] = useState<SEEKER_DATA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeekerProfile = async () => {
      if (!seekerID) return;
      try {
        setLoading(true);
        const data = await getSeekerData(seekerID);
        setSeeker(data);
      } catch (err) {
        console.error("Failed to fetch seeker profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekerProfile();
  }, [seekerID]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!seeker) {
    return <Typography variant="h6">Seeker profile not found</Typography>;
  }

  return (
    <div>
      <Header_2 />

      <Box
        sx={{
          padding: 5,
          backgroundColor: "white",
          borderRadius: "10px",
          minHeight: "400px",
        }}
      >
        <div className="seeker-profile-tab-container">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 2,
            }}
          ></Box>
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
                    <Typography variant="h4">
                      {seeker?.FirstName || ""}
                    </Typography>
                    <Typography variant="subtitle1">
                      Software Engineer
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">Phone No</Typography>
                    <Typography variant="subtitle1">
                      {seeker?.ContactNo}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="subtitle1">
                      {seeker?.Email || ""}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
                  <Chip label="Colombo" variant="outlined" />
                  <Chip
                    label={
                      "Experence: " +
                        seeker?.ProfessionalExperience +
                        "years" || ""
                    }
                    variant="outlined"
                  />
                  <Chip label={seeker?.JobType || ""} variant="outlined" />
                  <Chip label={seeker?.JobType2 || ""} variant="outlined" />
                </Box>
                <Box sx={{ display: "flex", marginTop: "5px", gap: "10px" }}>
                  <Chip label={seeker?.MinSalary || ""} variant="outlined" />
                  {seeker?.languages && seeker.languages.length > 0 && (
                    <Chip
                      label={
                        seeker.languages.find((l) => l.ExpertLevel === "Fluent")
                          ? `Fluent: ${
                              seeker.languages.find(
                                (l) => l.ExpertLevel === "Fluent"
                              )?.Language
                            }`
                          : `Fluent: ${seeker.languages[0].Language}`
                      }
                      variant="outlined"
                    />
                  )}
                  <Chip
                    label={
                      seeker?.DateOfBirth
                        ? new Date(seeker.DateOfBirth).toLocaleDateString()
                        : ""
                    }
                    variant="outlined"
                  />
                </Box>
              </Box>
            </div>

            {/* section */}
            <div className="seeker-profile-section-2">
              <Typography variant="h6">Social links</Typography>
              <Box className="seeker-profile-text-area-container">
                <Typography
                  className="seeker-profile-text-area"
                  variant="subtitle1"
                >
                  <a
                    href={seeker?.SocialLinks || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {seeker?.SocialLinks}
                  </a>
                </Typography>
              </Box>
            </div>
            {/* section */}
            <div className="seeker-profile-section-2">
              <Typography variant="h6">Address</Typography>
              <Box className="seeker-profile-text-area-container">
                <Typography
                  className="seeker-profile-text-area"
                  variant="subtitle1"
                >
                  {seeker?.Address || ""}
                </Typography>
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
                  {seeker?.Summary || ""}
                </Typography>
              </Box>
            </div>

            {/* section */}
            <div className="seeker-profile-section-2">
              <Typography variant="h6">Career History</Typography>
              <Box className="seeker-profile-text-area-container">
                {seeker?.careers && seeker.careers.length > 0 ? (
                  seeker.careers.map((career) => (
                    <Box key={career.id} mb={2}>
                      <Typography ml={2} mt={2} variant="h6">
                        {career.Designation}
                      </Typography>
                      <Typography ml={2} variant="subtitle2">
                        {career.CompanyName}
                      </Typography>
                      <Typography ml={2} variant="body2">
                        {career.StartDate} -{" "}
                        {career.EndDate ? career.EndDate : "Present"}
                      </Typography>
                      <Typography
                        className="seeker-profile-text-area"
                        variant="body1"
                      >
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
                {seeker?.educations && seeker.educations.length > 0 ? (
                  seeker.educations.map((edu) => (
                    <Box key={edu.id} mb={2}>
                      <Typography ml={2} mt={2} variant="h6">
                        {edu.InstituteName}
                      </Typography>
                      <Typography ml={2} variant="subtitle2">
                        {edu.FieldOfStudy}
                      </Typography>
                      <Typography ml={2} variant="body2">
                        {edu.StartDate} -{" "}
                        {edu.EndDate ? edu.EndDate : "Present"}
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
              <Box
                className="seeker-profile-text-area-container"
                sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
              >
                {seeker?.skills && seeker.skills.length > 0 ? (
                  seeker.skills.map((skill) => (
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
      </Box>
      <FooterSection_1 />
    </div>
  );
};

export default SeekerPublicViewPage;
