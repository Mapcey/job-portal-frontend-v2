// src/components/common/Loading.tsx
import { Box, Typography } from "@mui/material";

const Loading = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <div className="loader"></div>
      <Typography mt={2} variant="body1" color="grey">
        {text}
      </Typography>{" "}
    </Box>
  );
};

export default Loading;
