import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Tabs, Tab, Button } from "@mui/material";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

import SeekerProfileTab from "../../components/Seeker/SeekerProfileTab";
import { getSeekerFiles } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import SavedJobsTab from "../../components/Seeker/SavedJobsTab";
import NotificationsTab from "../../components/Seeker/NotificationsTab";
import ManageApplicationsTab from "../../components/Seeker/ManageApplicationsTab";

// import Loading from "../../components/Loading";

const SeekerProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { userInfo } = useAuth();
  const [latestVideo, setLatestVideo] = useState<any>(null);
  // Fetch latest video file for seeker
  useEffect(() => {
    const fetchVideo = async () => {
      if (userInfo && userInfo.UserId) {
        try {
          const filesData = await getSeekerFiles(userInfo.UserId.toString());
          const filesArr = Array.isArray(filesData) ? filesData : [filesData];
          const videoFiles = filesArr.filter(f => f.file_name.match(/\.mp4$/i));
          if (videoFiles.length > 0) {
            const latest = videoFiles.sort(
              (a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
            )[0];
            setLatestVideo(latest);
          } else {
            setLatestVideo(null);
          }
        } catch (error) {
          console.log('null video');
        }
      }
    };
    fetchVideo();
  }, [userInfo]);
  const navigate = useNavigate();

  const [breadcrumb, setBreadcrumb] = useState({
    title: "My Profile",
    desc: "Job seeker account. Manage your profile and preferences.",
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  // Update breadcrumb on tab change
  useEffect(() => {
    switch (selectedTab) {
      case 0:
        setBreadcrumb({
          title: "My Profile",
          desc: "Manage your personal information and experience.",
        });
        break;
      case 1:
        setBreadcrumb({
          title: "Saved Jobs",
          desc: "Jobs you saved for later viewing.",
        });
        break;
      case 2:
        setBreadcrumb({
          title: "Notifications",
          desc: "Check your updates and alerts here.",
        });
        break;
      case 3:
        setBreadcrumb({
          title: "Manage Applications",
          desc: "Check your applications here.",
        });
        break;
      default:
        break;
    }
  }, [selectedTab]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <SeekerProfileTab />;
      case 1:
        return <SavedJobsTab />;
      case 2:
        return <NotificationsTab />;
      case 3:
        return <ManageApplicationsTab />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header_2 />
      <Breadcrumb
        title={breadcrumb.title}
        description={breadcrumb.desc}
        backgroundImage="/imgs/backgrounds/bg-1.jpg"
      />

      <div className="seeker-profile-page-container">
        {/* Left Side - Tabs */}
        <Box
          className="seeker-profile-left-side"
          sx={{
            width: "20%",
            bgcolor: "white",
            borderRadius: "10px",
            padding: 2,
            margin: "50px 10px 30px 90px",
            height: "600px",
          }}
        >
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label="My Profile"
              sx={{
                color: "secondary.main",
                alignItems: "flex-start",
              }}
            />
            <Tab
              label="Saved Jobs"
              sx={{
                color: "secondary.main",
                alignItems: "flex-start",
              }}
            />
            <Tab
              label="Notifications"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
            <Tab
              label="My Applications"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
          </Tabs>


          <Box
            className="seeker-video-container"
            sx={{
              marginTop: 2,
              marginBottom: 3,
              width: 300,        // fixed width for uniformity
              height: 200,       // fixed height for box shape
              borderRadius: 2,   // border radius
              overflow: "hidden", // ensures video fits inside rounded corners
              boxShadow: 3,       // optional shadow
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000", // fallback background
            }}
          >
            {latestVideo ? (
              <video
                src={latestVideo.file_url}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src="/videos/self-intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>


          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              navigate("/jobs");
            }}
          >
            Browse Jobs
          </Button>
        </Box>

        {/* Right Side - Tab Content */}
        <Box
          className="seeker-profile-right-side"
          sx={{
            width: "60%",
            flexGrow: 1,
            padding: 3,
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "400px",
            margin: "50px 90px 30px 30px",
          }}
        >
          {renderTabContent()}
        </Box>
      </div>
    </div>
  );
};

export default SeekerProfilePage;
