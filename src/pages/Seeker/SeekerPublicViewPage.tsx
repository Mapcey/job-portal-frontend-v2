import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { Report } from "@mui/icons-material";

import { getSeekerData, getSeekerFiles } from "../../services/APIs/APIs"; // assume you have an API function
import { SEEKER_DATA } from "../../types/users";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import ReportDialog from "../../components/ReportDialog";

import { seekerFiles } from "../../types/users";

const SeekerPublicViewPage = () => {
  const { seekerID } = useParams<{ seekerID: string }>();
  const [seeker, setSeeker] = useState<SEEKER_DATA | null>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [files, setFiles] = useState<seekerFiles[] | null>(null);

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

      try {
        const filesData = await getSeekerFiles(seekerID.toString());
        setFiles(Array.isArray(filesData) ? filesData : [filesData]);
        console.log("Seeker files fetched:", filesData);
      } catch (error) {
        console.error("Failed to fetch seeker files:", error);
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
    <Box>
      <Header_2 />

      <Box
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          mt: 15,
          mb: 6,
          px: 3,
        }}
      >
        {/* Profile Header */}
        <Card sx={{ pt: 1, mb: 4, boxShadow: 2, borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                // src={seeker?.ProfilePic || "/imgs/people/p2.jpg"}
                alt={seeker?.FirstName}
                sx={{ width: 100, height: 100 }}
              />

              <Box flexGrow={1}>
                <Typography variant="h4" fontWeight={600}>
                  {seeker?.FirstName || ""}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Software Engineer
                </Typography>

                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip
                    variant="outlined"
                    label={seeker?.Address || "Colombo"}
                  />
                  <Chip
                    variant="outlined"
                    label={`Experience: ${
                      seeker?.ProfessionalExperience || 0
                    } yrs`}
                  />
                  <Chip variant="outlined" label={seeker?.JobType || ""} />
                  <Chip variant="outlined" label={seeker?.JobType2 || ""} />
                  {seeker?.MinSalary && (
                    <Chip
                      variant="outlined"
                      label={`Min Salary: ${seeker.MinSalary}`}
                    />
                  )}
                </Box>
              </Box>

              {/* Contact Info */}
              <Box textAlign="right">
                <Typography variant="body1" fontWeight={500}>
                  📞 {seeker?.ContactNo}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  ✉️ {seeker?.Email}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Sections */}
        {[
          { title: "Social Links", content: seeker?.SocialLinks },
          { title: "Address", content: seeker?.Address },
          { title: "Professional Summary", content: seeker?.Summary },
        ].map(
          (section, idx) =>
            section.content && (
              <Box key={idx} mb={4}>
                <Typography variant="h5" mb={1} fontWeight={600}>
                  {section.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  {section.content}
                </Typography>
              </Box>
            )
        )}

        {/* Career History */}
        <Box mb={4}>
          <Typography variant="h5" mb={1} fontWeight={600}>
            Career History
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {seeker?.careers?.length ? (
            seeker.careers.map((career) => (
              <Box key={career.id} mb={2}>
                <Typography variant="h6">{career.Designation}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {career.CompanyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {career.StartDate} - {career.EndDate || "Present"}
                </Typography>
                <Typography variant="body1">{career.Description}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No career history available.
            </Typography>
          )}
        </Box>

        {/* Education */}
        <Box mb={4}>
          <Typography variant="h5" mb={1} fontWeight={600}>
            Education
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {seeker?.educations?.length ? (
            seeker.educations.map((edu) => (
              <Box key={edu.id} mb={2}>
                <Typography variant="h6">{edu.InstituteName}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {edu.FieldOfStudy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.StartDate} - {edu.EndDate || "Present"}
                </Typography>
                <Typography variant="body2">
                  {edu.LevelOfStudy} {edu.Status ? `(${edu.Status})` : ""}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No education history available.
            </Typography>
          )}
        </Box>

        {/* Skills */}
        <Box mb={4}>
          <Typography variant="h5" mb={1} fontWeight={600}>
            Skills
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" gap={1} flexWrap="wrap">
            {seeker?.skills?.length ? (
              seeker.skills.map((skill) => (
                <Chip
                  key={skill.id}
                  label={`${skill.Skill} (${skill.ExpertLevel})`}
                  variant="outlined"
                />
              ))
            ) : (
              <Typography color="text.secondary">
                No skills available.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Report Button */}
        <Button onClick={handleOpen} sx={{ gap: 1 }}>
          <Report sx={{ color: "secondary.main" }} />
          <Typography color="secondary.light" variant="body2">
            Report Problem
          </Typography>
        </Button>

        <ReportDialog
          open={open}
          onClose={handleClose}
          mode="seeker"
          id={seeker.UserId}
        />
      </Box>

      <FooterSection_1 />
    </Box>
  );
};

export default SeekerPublicViewPage;
