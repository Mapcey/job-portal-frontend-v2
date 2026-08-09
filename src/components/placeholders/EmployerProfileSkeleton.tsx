import React from "react";
import { Box, Skeleton, Divider } from "@mui/material";

const EmployerProfileSkeleton = () => {
  return (
    <Box>
      {/* Profile Header Section */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-1">
          {/* Profile Image */}
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ flexShrink: 0 }}
          />

          {/* Company name */}
          <Skeleton variant="rounded" height={40} width="100%" />

          {/* Location */}
          <Skeleton variant="rounded" height={40} width="100%" />
        </div>

        <div className="emp-fs-text-inputs-1">
          {/* Phone */}
          <Skeleton variant="rounded" height={40} width="100%" />

          {/* Post Job Button */}
          <Skeleton variant="rounded" height={40} width="100%" />
        </div>
      </div>

      {/* Company Overview */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <Skeleton variant="rounded" height={120} width="100%" />
        </div>
      </div>

      {/* Website */}
      <div className="create-ac-form-section">
        <div className="fs-text-inputs-2">
          <Skeleton variant="rounded" height={40} width="100%" />
        </div>
      </div>

      {/* Cover Video */}
      <Box
        className="seeker-video-container"
        sx={{
          mb: 4,
          textAlign: "center",
        }}
      >
        <Skeleton
          variant="text"
          width={130}
          height={35}
          sx={{ mx: "auto", mt: 2, mb: 1 }}
        />

        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            maxWidth: 600,
            height: { xs: 180, sm: 300 },
            mx: "auto",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Edit Profile Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Skeleton variant="rounded" width={150} height={40} />
      </Box>
    </Box>
  );
};

export default EmployerProfileSkeleton;
