import React from "react";
import { Box, Card, CardContent, Skeleton, Divider } from "@mui/material";

const SeekerPulicViewSkeleton = () => {
  return (
    <Box>
      {/* Profile Header */}
      <Card
        sx={{
          pt: 1,
          mb: 4,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            gap={3}
          >
            {/* Profile Image */}
            <Skeleton
              variant="circular"
              width={90}
              height={90}
              sx={{ flexShrink: 0 }}
            />

            {/* Profile Info */}
            <Box flexGrow={1} width="100%">
              <Skeleton variant="text" width="180px" height={38} />
              <Skeleton variant="text" width="150px" height={28} />

              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                <Skeleton variant="rounded" width={100} height={32} />
                <Skeleton variant="rounded" width={120} height={32} />
                <Skeleton variant="rounded" width={100} height={32} />
                <Skeleton variant="rounded" width={90} height={32} />
              </Box>
            </Box>

            {/* Contact Info */}
            <Box width={{ xs: "100%", sm: 220 }} mt={{ xs: 1, sm: 0 }}>
              <Skeleton variant="text" width="100%" height={28} />
              <Skeleton variant="text" width="100%" height={28} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Social Links / Address / Summary */}
      {[1, 2, 3].map((section) => (
        <Box key={section} mb={4}>
          <Skeleton variant="text" width="180px" height={36} />

          <Divider sx={{ mb: 2 }} />

          <Skeleton variant="text" width="95%" height={24} />
          <Skeleton variant="text" width="85%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
        </Box>
      ))}

      {/* Career History */}
      <Box mb={4}>
        <Skeleton variant="text" width="200px" height={36} />
        <Divider sx={{ mb: 2 }} />

        {[1, 2].map((item) => (
          <Box key={item} mb={3}>
            <Skeleton variant="text" width="220px" height={30} />
            <Skeleton variant="text" width="180px" height={24} />
            <Skeleton variant="text" width="160px" height={22} />
            <Skeleton variant="text" width="95%" height={22} />
            <Skeleton variant="text" width="85%" height={22} />
          </Box>
        ))}
      </Box>

      {/* Education */}
      <Box mb={4}>
        <Skeleton variant="text" width="150px" height={36} />
        <Divider sx={{ mb: 2 }} />

        {[1, 2].map((item) => (
          <Box key={item} mb={3}>
            <Skeleton variant="text" width="220px" height={30} />
            <Skeleton variant="text" width="180px" height={24} />
            <Skeleton variant="text" width="160px" height={22} />
            <Skeleton variant="text" width="140px" height={22} />
          </Box>
        ))}
      </Box>

      {/* Skills */}
      <Box mb={4}>
        <Skeleton variant="text" width="100px" height={36} />
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" gap={1} flexWrap="wrap">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton
              key={item}
              variant="rounded"
              width={80 + item * 5}
              height={32}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SeekerPulicViewSkeleton;
