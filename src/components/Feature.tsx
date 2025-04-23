// import React from "react";
import { Typography, Button } from "@mui/material";

const Feature = () => {
  return (
    <div className="feature-container">
      <div className="feature-content">
        <div className="feature-content-left">
          <div className="f-c-l-set-1">
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/1.jpg"
              alt="Feature 1"
              style={{ height: "40%" }}
            />
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/2.jpg"
              alt="Feature 1"
              style={{ height: "100%" }}
            />
          </div>
          <div className="f-c-l-set-2">
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/3.jpg"
              alt="Feature 1"
              style={{ height: "100%" }}
            />
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/4.jpg"
              alt="Feature 1"
              style={{ height: "40%" }}
            />
          </div>
        </div>
        <div className="feature-content-right">
          <Typography variant="h3" gutterBottom>
            Help you to get the best job that fiys you
          </Typography>
          <div className="f-c-r-sections">
            <img
              alt="icon"
              className="f-c-r-img"
              src="/icons/feature section/i1.svg"
            />
            <div>
              <Typography variant="h4" gutterBottom>
                #1 Job Site in the Sri Lanka
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus,
              </Typography>
            </div>
          </div>

          <div className="f-c-r-sections">
            <img
              alt="icon"
              className="f-c-r-img"
              src="/icons/feature section/i3.svg"
            />
            <div>
              <Typography variant="h4" gutterBottom>
                Seamless Searching
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus,
              </Typography>
            </div>
          </div>
          <div className="f-c-r-sections">
            <img
              alt="icon"
              className="f-c-r-img"
              src="/icons/feature section/i2.svg"
            />
            <div>
              <Typography variant="h4" gutterBottom>
                Hired in Top Companies
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus,
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="upload-resume-container">
        <div className="upload-resume-content-1">Getting Started to work</div>
        <div className="upload-resume-content-2">
          Dont't Just Find. Be Found. Put Your CV in Front of Great Employees
        </div>
        <div className="upload-resume-content-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus,
        </div>
        <Button sx={{ margin: "20" }} variant="contained">
          Contained
        </Button>
      </div>
    </div>
  );
};

export default Feature;
