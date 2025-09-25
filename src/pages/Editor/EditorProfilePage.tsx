import { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import CreateNewPost from "../../components/editor/CreateNewPost";
import ManagePosts from "../../components/editor/ManagePosts";

export const EditorProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = Number(searchParams.get("tab")) || 0;

  const [selectedTab, setSelectedTab] = useState(tabFromUrl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // mobile breakpoint

  const handleTabChange = (_event: any, newValue: number) => {
    setSelectedTab(newValue);
    setSearchParams({ tab: newValue.toString() });
  };

  const handleDropdownChange = (event: any) => {
    const newValue = event.target.value;
    setSelectedTab(newValue);
    setSearchParams({ tab: newValue.toString() });
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <CreateNewPost />;
      case 1:
        // return <ManageCandidatesTab />;
        return "Pending Posts Content";
      case 2:
        return <ManagePosts />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header_2 />
      <Breadcrumb
        title="Editor Profile | Company Name"
        description="Editor Page - Level 01"
        backgroundImage="imgs/backgrounds/bg-1.jpg"
      />

      <div
        className="editor-profile-page-container"
        style={{ display: "flex" }}
      >
        {/* Left Side - Tabs (hidden on mobile) */}
        {!isMobile && (
          <Box
            className="employer-profile-left-side"
            sx={{
              width: "30%",
              bgcolor: "secondary.light",
              borderRadius: "10px",
              padding: 2,
              margin: "50px 10px 30px 90px",
              height: "500px",
            }}
          >
            <Tabs
              orientation="vertical"
              value={selectedTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Create a New Post" sx={{ color: "secondary.main" }} />
              <Tab label="Pending Posts" sx={{ color: "secondary.main" }} />
              <Tab
                label="Manage Posts & Candidates"
                sx={{ color: "secondary.main" }}
              />
            </Tabs>
          </Box>
        )}

        {/* Right Side - Tab Content */}
        <Box
          className="employer-profile-right-side"
          sx={{
            width: { xs: "100%", md: "50%" },
            flexGrow: 1,
            // padding: 3,
            backgroundColor: "white",
            borderRadius: "10px",
            minHeight: "300px",
            margin: { xs: "20px auto", md: "50px 90px 30px 30px" },
          }}
        >
          {/* Dropdown (only on mobile) */}
          {isMobile && (
            <Select
              value={selectedTab}
              onChange={handleDropdownChange}
              sx={{
                marginBottom: 2,
                width: "calc(100% - 20px)",
                ml: "10px",
                mr: "10px",
              }}
            >
              <MenuItem value={0}>Create a New Post</MenuItem>
              <MenuItem value={1}>Pending Posts</MenuItem>
              <MenuItem value={2}>Manage Posts</MenuItem>
            </Select>
          )}

          {renderTabContent()}
        </Box>
      </div>

      <FooterSection_1 />
    </div>
  );
};
