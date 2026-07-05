import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SeekerCard = ({ seeker }: any) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
      onClick={() => navigate(`/seekers/${seeker.id}`)}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={seeker.profileImage} sx={{ width: 56, height: 56 }}>
            {seeker.name?.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {seeker.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {seeker.category}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SeekerCard;
