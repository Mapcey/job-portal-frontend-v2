import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  title: string;
  description?: string;
  backgroundImage?: string;
  path?: BreadcrumbItem[]; // e.g. [{label:'Home',href:'/'}, {label:'Jobs',href:'/jobs'}, {label:'Job Details'}]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  description,
  backgroundImage,
  path = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(to right, #1976d2, #42a5f5)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 10 },
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Breadcrumb navigation */}
        {path.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" htmlColor="#fff" />}
            aria-label="breadcrumb"
            sx={{
              mb: 2,
              "& .MuiBreadcrumbs-li a": {
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              },
            }}
          >
            {path.map((item, index) =>
              item.href ? (
                <Link key={index} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <Typography key={index} color="#fff">
                  {item.label}
                </Typography>
              )
            )}
          </Breadcrumbs>
        )}

        {/* Title & Description */}
        <Typography variant={isMobile ? "h5" : "h3"} fontWeight={700} mb={1}>
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            sx={{ maxWidth: "700px", opacity: 0.9 }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Breadcrumb;
