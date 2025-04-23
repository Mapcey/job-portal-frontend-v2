import React from "react";
import Box from "@mui/material/Box";

const HowItsWork = () => {
  return (
    <div className="how-its-work-container">
      <Box sx={{ bgcolor: "primary.main" }}>
        <div className="how-its-work-content">
          <div className="h-w-section">
            <img
              src="/public/icons/account.svg"
              alt="icon"
              className="section-icon-img"
            />
            <h2>Register Your Account</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum
              sed leo eget venenatis. Sed ullamcorper pulvinar lectus.
            </p>
          </div>
          <div className="h-w-section">
            <img
              src="/public/icons/cv.svg"
              alt="icon"
              className="section-icon-img"
            />
            <h2>Upload Your Resume</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum
              sed leo eget venenatis. Sed ullamcorper pulvinar lectus.
            </p>
          </div>
          <div className="h-w-section">
            <img
              src="/public/icons/work.svg"
              alt="icon"
              className="section-icon-img"
            />
            <h2>Apply for Dream Job</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum
              sed leo eget venenatis. Sed ullamcorper pulvinar lectus.
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default HowItsWork;
