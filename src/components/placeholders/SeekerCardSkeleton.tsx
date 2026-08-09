import { Card, CardContent, Box, Skeleton } from "@mui/material";

const SeekerCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 190,
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Profile header */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Skeleton variant="circular" width={64} height={64} />

          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="70%" height={28} />
            <Skeleton variant="text" width="50%" height={22} />
          </Box>
        </Box>

        {/* Details */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="75%" />

        {/* Bottom chips */}
        <Box display="flex" gap={1} mt={2}>
          <Skeleton variant="rounded" width={75} height={26} />
          <Skeleton variant="rounded" width={90} height={26} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SeekerCardSkeleton;
