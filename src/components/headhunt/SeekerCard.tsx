import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SeekerCard = ({ seeker }: any) => {
  const navigate = useNavigate();

  const fullName =
    `${seeker.FirstName || ""} ${seeker.LastName || ""}`.trim() ||
    "Unnamed Seeker";

  const initials = `${seeker.FirstName?.charAt(0) || ""}${seeker.LastName?.charAt(0) || ""}`;

  return (
    <Card
      sx={{
        cursor: "pointer",
        width: "100%",
        height: "100%",
        minHeight: 190,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.25s ease",
        display: "flex",
        flexDirection: "column",

        "&:hover": {
          boxShadow: 5,
          transform: "translateY(-3px)",
          borderColor: "primary.main",
        },
      }}
      onClick={() => navigate(`/seeker_account/${seeker.UserId}`)}
      // onClick={() => navigate(`/seekers/1`)}
    >
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Profile Header */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={seeker.profileImage || undefined}
            sx={{
              width: 64,
              height: 64,
              flexShrink: 0,
            }}
          >
            {initials}
          </Avatar>

          <Box
            sx={{
              minWidth: 0,
              flexGrow: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {fullName}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              {seeker.JobType || "Job seeker"}
            </Typography>

            {seeker.Location && (
              <Typography variant="body2" color="text.secondary" noWrap>
                📍 {seeker.Location}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Candidate Information */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {seeker.Experience !== undefined && (
            <Chip
              size="small"
              label={`${seeker.Experience} yrs experience`}
              variant="outlined"
            />
          )}

          {seeker.WorkType && (
            <Chip size="small" label={seeker.WorkType} variant="outlined" />
          )}
        </Box>

        {/* Skills */}
        {seeker.Skills && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
            }}
          >
            {Array.isArray(seeker.Skills)
              ? seeker.Skills.join(", ")
              : seeker.Skills}
          </Typography>
        )}

        {/* Bottom */}
        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="body2"
          color="primary"
          fontWeight={600}
          sx={{ mt: 2 }}
        >
          View Profile →
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SeekerCard;
