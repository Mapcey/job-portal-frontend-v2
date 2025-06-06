import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import EmployerProfileTab from "../../components/Employer/EmployerProfileTab";
import ManageCandidatesTab from "../../components/Employer/ManageCandidates";
import NotificationsTab from "../../components/Seeker/NotificationsTab";
import PostedJobs from "../../components/Employer/PostedJobs";
import PendingApprovalsTab from "../../components/Employer/PendingApprovalsTab";

const EmployerProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [breadcrumb, setBreadcrumb] = useState({
    title: "My Profile",
    desc: "Job seeker account. Manage your profile and preferences.",
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Suicul",
      location: "Remote",
      status: "Open",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Suicul",
      location: "Colombo",
      status: "Closed",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Suicul",
      location: "Colombo",
      status: "Closed",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Suicul",
      location: "Colombo",
      status: "Closed",
    },
  ];

  const pendingJobs = [
    {
      id: 101,
      title: "React Developer (Remote)",
      editor: "Jane Doe",
      submittedAt: "2025-05-03 10:15 AM",
    },
    {
      id: 102,
      title: "Marketing Executive",
      editor: "John Smith",
      submittedAt: "2025-05-04 08:42 AM",
    },
  ];

  // Update breadcrumb on tab change
  useEffect(() => {
    switch (selectedTab) {
      case 0:
        setBreadcrumb({
          title: "Employer > Profile",
          desc: "Manage your personal information and experience.",
        });
        break;
      case 1:
        setBreadcrumb({
          title: "Manage Candidates",
          desc: "Jobs you saved for later viewing.",
        });
        break;
      case 2:
        setBreadcrumb({
          title: "Manage Posted Jobs",
          desc: "Check your updates and alerts here.",
        });
        break;
      case 3:
        setBreadcrumb({
          title: "Notifications",
          desc: "Check your applications here.",
        });
        break;
      case 4:
        setBreadcrumb({
          title: "Pending Approvals",
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
        return <EmployerProfileTab />;
      case 1:
        return <ManageCandidatesTab />;
      case 2:
        return (
          <PostedJobs
            jobs={jobs}
            onClose={(id) => console.log("Close job:", id)}
            onDelete={(id) => console.log("Delete job:", id)}
          />
        );
      case 3:
        return <NotificationsTab />;
      case 4:
        return (
          <PendingApprovalsTab
            pendingJobs={pendingJobs}
            onApprove={(id) => console.log("Approved:", id)}
            onView={(id) => console.log("View job:", id)}
            onDelete={(id) => console.log("Deleted:", id)}
          />
        );
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
              label="Manage Candidates"
              sx={{
                color: "secondary.main",
                alignItems: "flex-start",
              }}
            />
            <Tab
              label="Posted Jobs"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
            <Tab
              label="Notifications"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />

            <Tab
              label="Pending Approvals"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
          </Tabs>

          {/* <Box
            className="seeker-video-container"
            sx={{ marginTop: 2, marginBottom: 3 }}
          >
            <video controls width="100%" style={{ borderRadius: "8px" }}>
              <source src="/videos/self-intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box> */}

          <Button sx={{ mt: 5 }} fullWidth variant="contained">
            Start Head Hunting
          </Button>
          <button className="glow-on-hover" type="button">
            Upgrade today !
          </button>
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

export default EmployerProfilePage;
