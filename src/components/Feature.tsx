import React, { useEffect, useRef, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Feature = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const handleProfileClick = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if ("EmployerId" in userInfo && userInfo.EmployerId) {
      navigate("/employer/profile");
      return;
    }

    if ("SeekerId" in userInfo && userInfo.SeekerId) {
      navigate("/seeker/profile");
      return;
    }

    // If userInfo exists but doesn't match either account type
    navigate("/login");
  };

  return (
    <div className="feature-container">
      <div className="feature-content">
        {/* Left Image Section */}
        <div className="feature-content-left">
          <div className="f-c-l-set-1">
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/1.jpg"
              alt="Professionals at work"
              style={{ height: "40%" }}
            />

            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/2.jpg"
              alt="Job seeker working"
              style={{ height: "100%" }}
            />
          </div>

          <div className="f-c-l-set-2">
            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/3.jpg"
              alt="Professional team"
              style={{ height: "100%" }}
            />

            <img
              className="f-c-l-set-1-img"
              src="/imgs/feature section/4.jpg"
              alt="Career opportunity"
              style={{ height: "40%" }}
            />
          </div>
        </div>

        {/* Right Content Section */}
        <div className="feature-content-right">
          <Typography variant="h3" gutterBottom>
            Find the Right Opportunity for Your Career
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Discover relevant job opportunities, connect with employers, and
            take the next step toward building a successful career.
          </Typography>

          {/* Feature 1 */}
          <div className="f-c-r-sections">
            <img
              alt="Job opportunities"
              className="f-c-r-img"
              src="/icons/feature section/i1.svg"
            />

            <div>
              <Typography variant="h4" gutterBottom>
                Opportunities That Match Your Skills
              </Typography>

              <Typography variant="body1" gutterBottom>
                Explore job opportunities across a wide range of industries and
                career categories. Find positions that align with your skills,
                qualifications, experience, and career goals.
              </Typography>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="f-c-r-sections">
            <img
              alt="Easy job search"
              className="f-c-r-img"
              src="/icons/feature section/i3.svg"
            />

            <div>
              <Typography variant="h4" gutterBottom>
                Simple & Convenient Job Search
              </Typography>

              <Typography variant="body1" gutterBottom>
                Search and filter jobs by category, location, employment type,
                education, experience, salary, and more. Find relevant
                opportunities without spending hours searching.
              </Typography>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="f-c-r-sections">
            <img
              alt="Career growth"
              className="f-c-r-img"
              src="/icons/feature section/i2.svg"
            />

            <div>
              <Typography variant="h4" gutterBottom>
                Connect With the Right Employers
              </Typography>

              <Typography variant="body1" gutterBottom>
                Build a professional profile that highlights your qualifications
                and experience, helping employers understand your strengths and
                discover your potential.
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Profile / Resume Section */}
      <div className="upload-resume-container">
        <div className="upload-resume-content-1">
          Get Started With Your Career
        </div>

        <div className="upload-resume-content-2">
          Don't Just Search for Opportunities. Let Employers Find You.
        </div>

        <div className="upload-resume-content-3">
          Complete your professional profile with your education, skills,
          experience, and career preferences. A complete profile gives employers
          a better understanding of your background and helps you present
          yourself professionally.
        </div>

        <Button
          sx={{ margin: "20px" }}
          variant="contained"
          onClick={handleProfileClick}
        >
          Complete Your Profile
        </Button>
      </div>
    </div>
  );
};

export default Feature;
