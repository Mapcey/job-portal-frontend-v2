import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import { useAuth } from "../../context/AuthContext";

import NotificationPopover from "./NotificationPop";

const settings = ["Profile", "Edite", "Logout"];

const Header_2 = () => {
  const [elevated, setElevated] = useState(false);
  const { logout, userInfo, userRole } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);

  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const pages = [
    { label: "Home", path: "/" },
    { label: "Browse Jobs", path: "/jobs" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
    { label: "Pricing", path: "/pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 50); // Shrink header when scrolled past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      logout();
      navigate("/login");
    } else if (setting === "Profile") {
      if (userRole == "seeker") {
        navigate("/seeker/profile");
        console.log(userRole);
      } else if (userRole == "employer") {
        navigate("/employer/profile");
        console.log(userRole);
      } else {
        console.log("no user role");
      }
    } else if (setting === "Edite") {
      if (userRole == "seeker") {
        navigate("/seeker/register");
      } else if (userRole == "employer") {
        navigate("/employer/register");
      } else {
        console.log("no user role");
      }
    }
  };

  // Helper to get first letter of email (uppercase)
  const getInitial = () => {
    if (userRole == "employer") {
      if (userInfo && userInfo.CompanyName) {
        return userInfo.CompanyName.charAt(0).toUpperCase();
      }
    } else if (userRole == "seeker") {
      if (userInfo && userInfo.Name) {
        return userInfo.Name.charAt(0).toUpperCase();
      }
    }

    return "";
  };

  const handleTest = () => {
    console.log("info: ", userInfo);
    console.log("role: ", userRole);
  };

  return (
    <div style={{ marginBottom: 90 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "primary.light" }}
        elevation={elevated ? 4 : 0}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: elevated ? 60 : 90, // Shrinks from 80 to 60px
              transition: "all 0.3s ease",
            }}
          >
            {/* logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logos/logo_header.svg"
                alt="Logo"
                className="header-logo"
                style={{ height: 50 }}
              />
            </Box>

            {/* space */}
            <Box sx={{ flexGrow: 1 }} />

            {/* mobile view menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {pages.map((page) => (
                <Button
                  onClick={() => navigate(page.path)}
                  key={page.label}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* login/user section */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                marginLeft: 4,
              }}
            >
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                onClick={handleTest}
              >
                <MailIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{ marginRight: 2 }}
                onClick={handleOpenNotification}
              >
                <NotificationsIcon />
              </IconButton>

              <NotificationPopover
                anchorEl={anchorElNotification}
                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotification}
              />

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{getInitial()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header_2;
