import { Box, Card, Skeleton } from "@mui/material";

const JobResultsSkeleton = () => {
  return (
    <Box>
      {/* Job cards */}
      <Box display="flex" flexDirection="column" gap={2}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              p: 2,
            }}
          >
            {/* Company logo */}
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{ mr: 2, flexShrink: 0 }}
            />

            {/* Job information */}
            <Box flex={1}>
              <Skeleton variant="text" width="45%" height={30} />

              <Skeleton variant="text" width="60%" height={22} />

              <Box display="flex" gap={1} mt={1}>
                <Skeleton variant="rounded" width={80} height={24} />

                <Skeleton variant="rounded" width={90} height={24} />

                <Skeleton variant="rounded" width={100} height={24} />
              </Box>
            </Box>

            {/* Buttons */}
            <Box display="flex" gap={1} ml={2}>
              <Skeleton variant="rounded" width={55} height={32} />

              <Skeleton variant="rounded" width={65} height={32} />
            </Box>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Skeleton variant="rounded" width={250} height={40} />
      </Box>
    </Box>
  );
};

export default JobResultsSkeleton;
