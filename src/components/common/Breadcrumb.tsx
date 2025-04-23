import React from "react";
import { Box } from "@mui/material";

interface BreadcrumbProps {
  title: string;
  description: string;
  backgroundImage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  description,
  backgroundImage,
}) => {
  return (
    <div
      className="breadcrumb-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Box className="breadcrumb-content">
        <div className="breadcrumb-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </Box>
    </div>
  );
};

export default Breadcrumb;
