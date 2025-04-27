import React from "react";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const PostJob = () => {
  return (
    <div className="post-job-container">
      <Header_2 />
      <Breadcrumb
        title={"Post a New Job"}
        description={"this is the description"}
        backgroundImage={"/imgs/backgrounds/bg-1.jpg"}
      />
      <div className="post-job-content">
        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: "0", paddingTop: "20", marginTop: 30 }}>
            Job Information
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <div className="post-job-content-section-1">
            <div className="p-j-form-row">
              <TextField
                label="Job Title"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
              <TextField
                label="Location"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
            </div>
            <div className="p-j-form-row">
              <TextField
                label="Job Category"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
              <TextField
                label="Job Type"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
            </div>

            <div className="p-j-form-row">
              <TextField
                label="Education Level"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
              <TextField
                label="Professional Experience"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
            </div>
            <div className="p-j-form-row">
              <TextField
                label="Prefered Languages"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
              <TextField
                label="Salary Rage"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
            </div>
            <div className="p-j-form-row">
              <TextField
                label="Age Range"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
              <TextField
                label="Job Posting Duration"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
            </div>
          </div>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: "0", paddingTop: "20", marginTop: 30 }}>
            Job Description
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <TextField
            id="outlined-multiline-static"
            label="Add a Detailed Description"
            placeholder="add a detailed summery of yor experience."
            multiline
            rows={6}
            className="text-input-3"
            size="small"
            sx={{ width: "100%" }}
          />
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <Button variant="contained" sx={{ marginTop: "20px" }}>
            Post Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
