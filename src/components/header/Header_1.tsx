import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Home", "Browse Jobs", "Contact", "About"];

const Header_1 = () => {
  const [elevated, setElevated] = useState(false);

  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login");
  };

  const handleSignupButton = () => {
    navigate("/signup");
  };

  const handleMenuButtons = (page: string) => {
    if (page == "Home") {
      navigate(`/`);
    } else if (page == "Browse Jobs") {
      navigate(`/jobs`);
    } else if (page == "Contact") {
      navigate(`/contact`);
    } else if (page == "About") {
      navigate(`/about`);
    } else {
      navigate("/notFound");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 50); // Shrink header when scrolled past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ marginBottom: 100 }}>
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
                  key={page}
                  onClick={() => handleMenuButtons(page)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* login */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                marginLeft: 2,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLoginButton}
                sx={{
                  borderRadius: 2,
                  padding: "5px 20px",
                  marginRight: 2,
                  marginLeft: 2,
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignupButton}
                sx={{ borderRadius: 2, padding: "5px 20px" }}
              >
                Sign Up
              </Button>
            </Box>

            {/* login buttons */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header_1;
