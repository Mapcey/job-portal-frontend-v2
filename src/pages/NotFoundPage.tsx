import { Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "80px", md: "140px" },
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: "secondary.main" }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "secondary.main" }}>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "50px",
            paddingX: 4,
            paddingY: 1.5,
            textTransform: "none",
          }}
        >
          Go to Home
        </Button>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;
