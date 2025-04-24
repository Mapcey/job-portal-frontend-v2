import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";

import SeekerProfileTab from "../../components/Seeker/SeekerProfileTab";
import SavedJobsTab from "../../components/Seeker/SavedJobsTab";
import NotificationsTab from "../../components/Seeker/NotificationsTab";

const SeekerProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
        return <NotificationsTab />; // Replace with <NotificationsTab />
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
          }}
        >
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="My Profile" sx={{ color: "secondary.main" }} />
            <Tab label="Saved Jobs" sx={{ color: "secondary.main" }} />
            <Tab label="Notifications" sx={{ color: "secondary.main" }} />
          </Tabs>
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
