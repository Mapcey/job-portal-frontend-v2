// src/components/common/Loading.tsx
import {
  CircularProgress,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

const Loading = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {/* <CircularProgress size={48} color="primary" />
      <LinearProgress sx={{ width: "100%" }} />
      <Typography mt={2} variant="body1" color="grey">
        {text}
      </Typography> */}
      <div className="loader"></div>
      <Typography mt={2} variant="body1" color="grey">
        {text}
      </Typography>{" "}
    </Box>
  );
};

export default Loading;
