import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import EmployerProfileTab from "../../components/Employer/EmployerProfileTab";
import ManageCandidatesTab from "../../components/Employer/ManageCandidates";
import NotificationsTab from "../../components/Employer/NotificationsTab";
import PostedJobs from "../../components/Employer/PostedJobs";
import PendingApprovalsTab from "../../components/Employer/PendingApprovalsTab";
import ManageEditorsTab from "../../components/Employer/ManageEditorsTab";

const EmployerProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = Number(searchParams.get("tab")) || 0;

  const [selectedTab, setSelectedTab] = useState(tabFromUrl);

  const [breadcrumb, setBreadcrumb] = useState({
    title: "My Profile",
    desc: "Job seeker account. Manage your profile and preferences.",
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setSearchParams({ tab: newValue.toString() }); // 🔑 update URL without reload
  };

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
      case 5:
        setBreadcrumb({
          title: "Manage Editors",
          desc: "Manage editors accounts here.",
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
        return <PostedJobs />;
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
      case 5:
        return <ManageEditorsTab />;
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

      <div className="employer-profile-page-container">
        {/* Left Side - Tabs */}
        <Box
          className="employer-profile-left-side"
          sx={{
            width: "20%",
            bgcolor: "secondary.light",
            borderRadius: "10px",
            padding: 2,
            margin: "50px 10px 30px 90px",
            height: "600px",
            // border: 1,
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
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
            <Tab
              label="Manage Candidates"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
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
            <Tab
              label="Manage Editors"
              sx={{ color: "secondary.main", alignItems: "flex-start" }}
            />
          </Tabs>

          <Button sx={{ mt: 5 }} fullWidth variant="contained">
            Start Head Hunting
          </Button>
          <button className="glow-on-hover" type="button">
            Upgrade today !
          </button>
        </Box>

        {/* Right Side - Tab Content */}
        <Box
          className="employer-profile-right-side"
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
      <FooterSection_1 />
    </div>
  );
};

export default EmployerProfilePage;
