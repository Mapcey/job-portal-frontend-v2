import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

import SeekerProfileTab from "../../components/Seeker/SeekerProfileTab";
import { getSeekerFiles } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import SavedJobsTab from "../../components/Seeker/SavedJobsTab";
import NotificationsTab from "../../components/Seeker/NotificationsTab";
import ManageApplicationsTab from "../../components/Seeker/ManageApplicationsTab";
import SubscriptionStatusTab from "../../components/Subscription/SubscriptionStatusTab";
import FooterSection_1 from "../../components/footer/FooterSection_1";
// import Loading from "../../components/Loading";
 
const SeekerProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { userInfo } = useAuth();
  const [latestVideo, setLatestVideo] = useState<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Fetch latest video file for seeker
  useEffect(() => {
    const fetchVideo = async () => {
      if (userInfo && userInfo.UserId) {
        
          console.log('1');
        try {
          const filesData = await getSeekerFiles(userInfo.UserId.toString());
          console.log('2');
          const filesArr = Array.isArray(filesData) ? filesData : [filesData];
          console.log('3', filesArr);
          const videoFiles = filesArr.filter(
            (f) => typeof f.file_name === "string" && /\.mp4$/i.test(f.file_name)
          );
          console.log('4', videoFiles);
          if (videoFiles.length > 0) {
            const latest = videoFiles.sort(
              (a, b) =>
                new Date(b.uploaded_at).getTime() -
                new Date(a.uploaded_at).getTime()
            )[0];
            setLatestVideo(latest);
          } else {
            setLatestVideo(null);
          }
        } catch (error) {
          console.error('null video', error);
          setLatestVideo(null);
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
          title: "Subscriptions",
          desc: "Manage your subscription status and payslips.",
        });
        break;
      case 2:
        setBreadcrumb({
          title: "Saved Jobs",
          desc: "Jobs you saved for later viewing.",
        });
        break;
      case 3:
        setBreadcrumb({
          title: "Notifications",
          desc: "Check your updates and alerts here.",
        });
        break;
      case 4:
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
        return (
          <Box>
            <SeekerProfileTab />

          {/* Video section below profile tab */}
          <Box
            className="seeker-video-container"
            sx={{
              marginTop: 4,
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
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
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center", p: 2 }}
              >
                No video available
              </Typography>
            )}
          </Box>
        </Box>
      );
      case 1:
        return <SubscriptionStatusTab />;
      case 2:
        return <SavedJobsTab />;
      case 3:
        return <NotificationsTab />;
      case 4:
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

      <div
        className="seeker-profile-page-container"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "flex-start",
          padding: isMobile ? "16px" : "0",
        }}
      >
        {/* Tabs or Dropdown */}
        {isMobile ? (
          // Mobile Dropdown
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: 2,
              marginBottom: 2,
              // boxShadow: 2,
            }}
          >
            <Select
              fullWidth
              value={selectedTab}
              onChange={(e) => setSelectedTab(Number(e.target.value))}
              variant="outlined"
            >
              <MenuItem value={0}>My Profile</MenuItem>
              <MenuItem value={1}>Subscriptions</MenuItem>
              <MenuItem value={2}>Saved Jobs</MenuItem>
              <MenuItem value={3}>Notifications</MenuItem>
              <MenuItem value={4}>My Applications</MenuItem>
            </Select>
          </Box>
        ) : (
          // Desktop Vertical Tabs
          <Box
            className="seeker-profile-left-side"
            sx={{
              width: "20%",
              bgcolor: "white",
              borderRadius: "10px",
              padding: 2,
              margin: "50px 10px 30px 90px",
              height: "600px",
              boxShadow: 3,
            }}
          >
            <Tabs
              orientation="vertical"
              value={selectedTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="My Profile" sx={{ alignItems: "flex-start" }} />
              <Tab label="Subscriptions" sx={{ alignItems: "flex-start" }} />
              <Tab label="Saved Jobs" sx={{ alignItems: "flex-start" }} />
              <Tab label="Notifications" sx={{ alignItems: "flex-start" }} />
              <Tab label="My Applications" sx={{ alignItems: "flex-start" }} />
            </Tabs>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                navigate("/jobs");
              }}
            >
              Browse Jobs
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                //navigate("/jobs");
              }}
            >
              Allow head hunting
            </Button>
          </Box>
        )}

        {/* Right Side Content */}
        <Box
          className="seeker-profile-right-side"
          sx={{
            width: isMobile ? "100%" : "60%",
            flexGrow: 1,
            padding: 3,
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "400px",
            margin: isMobile ? "0" : "50px 90px 30px 30px",
            boxShadow: isMobile ? 2 : 0,
          }}
        >
          {renderTabContent()}
        </Box>
      </div>
      <FooterSection_1 />
    </div>
  );
};

export default SeekerProfilePage;