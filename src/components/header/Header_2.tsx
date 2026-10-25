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
import { deleteUser } from "firebase/auth";
import { auth } from "../../firebase/config";

import {
  getAllEmployerNotifications,
  getEmployerFiles,
  getSeekerNotifications,
  deleteEmployer,
} from "../../services/APIs/APIs";
import { getSeekerFiles } from "../../services/APIs/APIs";
import NotificationPopover from "./NotificationPop";

const settings = ["Profile", "Edit", "Deactivate", "Logout"];

const Header_2 = () => {
  const [elevated, setElevated] = useState(false);
  const { logout, userInfo, userRole, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const handleOpenNotification = async (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setAnchorElNotification(event.currentTarget);
    setLoadingNotifications(true);

    try {
      if (userRole === "employer") {
        const res = await getAllEmployerNotifications(userInfo.EmployerId);
        setNotifications(Array.isArray(res) ? res : []);
      } else if (userRole === "seeker") {
        const res = await getSeekerNotifications(userInfo.UserId);
        setNotifications(Array.isArray(res) ? res : []);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }

    setLoadingNotifications(false);
  };

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
    } else if (userRole == "editor") {
      navigate("/editor");
      console.log(userRole);
    } else {
      console.log("no user role");
      logout();
    }
    setDrawerOpen(false);
  };

  const pages = [
    { label: "Home", path: "/" },
    { label: "Browse Jobs", path: "/job_posts" },
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

  const handleMenuItemClick = async (setting: string) => {
    handleCloseUserMenu();

    if (setting === "Logout") {
      logout();
      navigate("/login");
    } else if (setting === "Profile") {
      if (userRole === "seeker") {
        navigate("/seeker/profile");
      } else if (userRole === "employer") {
        navigate("/employer/profile");
        console.log("profile");
      } else if (userRole === "editor") {
        navigate("/editor"); // ✅ Optional route if available
      }
    } else if (setting === "Edit") {
      if (userRole === "seeker") {
        navigate("/seeker/profile/edit");
      } else if (userRole === "employer") {
        navigate("/employer/edit_profile");
      }
    } else if (setting === "Deactivate") {
      await handleDeactivate();
    }
  };

  const handleDeactivate = async () => {
    handleCloseUserMenu();
    const confirm = window.confirm(
      "Are you sure you want to deactivate your account? This will permanently delete your account.",
    );
    if (!confirm) return;

    const user = auth.currentUser;
    if (!user) {
      window.alert("No authenticated user found. Please log in again.");
      return;
    }

    try {
      await deleteUser(user);
      // After successful deletion, clear local auth state and navigate home

      try {
        let resp;
        let userId;

        if (userRole === "employer") {
          userId = userInfo?.EmployerId;
        } else if (userRole === "seeker") {
          userId = userInfo?.UserId;
        }

        if (userRole === "employer") {
          resp = await deleteEmployer(userId);
        } else if (userRole === "seeker") {
          console.log("Getting seeker files:", userId);
          resp = await deleteEmployer(userId);
        }

        console.log("Files:", resp);
      } catch (err) {
        console.error("Failed to fetch profile image:", err);
        setProfileImage(null);
      }

      logout();
      navigate("/");
      window.alert("Account deactivated successfully.");
    } catch (err: any) {
      console.error("Failed to deactivate account:", err);
      if (err.code === "auth/requires-recent-login") {
        window.alert(
          "Please re-authenticate and try again (you must sign in again before deleting your account).",
        );
      } else {
        window.alert(err.message || "Failed to deactivate account.");
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

  useEffect(() => {
    const fetchProfileImage = async () => {
      console.log("Getting profile image");

      // Determine the correct user ID
      let userId: undefined;

      if (userRole === "employer") {
        userId = userInfo?.EmployerId;
      } else if (userRole === "seeker") {
        userId = userInfo?.UserId;
      }

      if (!userId) {
        console.log("No user ID available yet");
        return;
      }

      // Separate cache for employer/seeker and each user
      const cacheKey = `profileImage_${userRole}_${userId}`;

      const cachedImage = localStorage.getItem(cacheKey);

      if (cachedImage) {
        console.log("Using cached profile image:", cachedImage);
        setProfileImage(cachedImage);
        return;
      }

      try {
        let files;

        if (userRole === "employer") {
          console.log("Getting employer files:", userId);
          files = await getEmployerFiles(userId);
        } else if (userRole === "seeker") {
          console.log("Getting seeker files:", userId);
          files = await getSeekerFiles(userId);
        }

        console.log("Files:", files);

        if (files) {
          const imageFile = files.find(
            (file: any) => file.FileCategory === "FileType.image",
          );

          console.log(imageFile);

          if (imageFile?.FileUrl) {
            console.log("Profile image:", imageFile.FileUrl);

            setProfileImage(imageFile.FileUrl);
            console.log();

            // Cache for this specific account
            localStorage.setItem(cacheKey, imageFile.FileUrl);
          } else {
            console.log("No profile image found");
            setProfileImage(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile image:", err);
        setProfileImage(null);
      }
    };

    fetchProfileImage();
  }, [userRole, userInfo]);

  const handleTest = () => {
    console.log("info: ", userInfo);
    console.log("role: ", userRole);
    console.log("is auth", isAuthenticated);
    console.log("token", token);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const HandleBacktoHome = () => {
    navigate("/");
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
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <img
                src="/logos/logo_header.svg"
                alt="Logo"
                className="header-logo"
                style={{ height: 50 }}
                onClick={HandleBacktoHome}
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

              {/* Post Job Button - Employers Only */}
              {isAuthenticated && userRole === "employer" && (
                <Button
                  variant="contained"
                  onClick={() => navigate("/employer/jobs/create")}
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  Post Job
                </Button>
              )}
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
                notifications={notifications}
                loading={loadingNotifications}
              />

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {profileImage ? (
                    <Avatar
                      src={profileImage}
                      alt="Profile"
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    >
                      {getInitial()}
                    </Avatar>
                  )}
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
