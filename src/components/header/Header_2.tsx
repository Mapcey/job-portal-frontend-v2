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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import { useAuth } from "../../context/AuthContext";

import NotificationPopover from "./NotificationPop";

const settings = ["Profile", "Edit", "Logout"];

const Header_2 = () => {
  const [elevated, setElevated] = useState(false);
  const { logout, userInfo, userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);
  const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  const handleViewProfile = () => {
    if (userRole == "seeker") {
      navigate("/seeker/profile");
      console.log(userRole);
    } else if (userRole == "employer") {
      navigate("/employer/profile");
      console.log(userRole);
    } else {
      console.log("no user role");
      logout();
    }
    setDrawerOpen(false);
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
        logout();
        navigate("/login");
      }
    } else if (setting === "Edit") {
      if (userRole == "seeker") {
        navigate("/seeker/profile/edit");
      } else if (userRole == "employer") {
        navigate("/employer/edit_profile");
      } else {
        console.log("no user role");
        logout();
        navigate("/login");
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
    console.log("is auth", isAuthenticated);
    console.log("token", );
    
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List>
            {pages.map((page) => (
              <ListItem key={page.label} disablePadding>
                <ListItemButton onClick={() => handleNavigate(page.path)}>
                  <ListItemText primary={page.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleViewProfile}
            >
              View Profile
            </Button>
          </Box>

          {isAuthenticated && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

export default Header_2;
