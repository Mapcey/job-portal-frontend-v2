import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/AuthContext";

const settings = ["Profile", "Settings", "Logout"];

const Header_2 = () => {
  const [elevated, setElevated] = useState(false);
  const { logout, userInfo } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
      navigate("/employer/profile"); // Or whatever your profile route is
    }
  };

  // Helper to get first letter of email (uppercase)
  const getInitial = () => {
    if (userInfo && userInfo.email) {
      return userInfo.email.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <div style={{ marginBottom: 90 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "primary.light", transition: "all 0.3s ease" }}
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
              <IconButton size="large" aria-label="show 4 new mails">
                <MailIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                sx={{ marginRight: 2 }}
              >
                <NotificationsIcon />
              </IconButton>
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
