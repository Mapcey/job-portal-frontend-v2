import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

const pages = ["Home", "Browse Jobs", "Contact", "About"];

const Header_1 = () => {
  const [elevated, setElevated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleSignupButton = () => {
    navigate("/signup");
    setDrawerOpen(false);
  };

  const handleMenuButtons = (page: string) => {
    if (page === "Home") navigate(`/`);
    else if (page === "Browse Jobs") navigate(`/jobs`);
    else if (page === "Contact") navigate(`/contact`);
    else if (page === "About") navigate(`/about`);
    else navigate("/notFound");

    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 50);
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
              height: elevated ? 60 : 90,
              transition: "all 0.3s ease",
            }}
          >
            {/* logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to="/"
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                <img
                  src="/logos/logo_header.svg"
                  alt="Logo"
                  className="header-logo"
                  style={{ height: 50, cursor: "pointer" }}
                />
              </Link>
            </Box>

            {/* space */}
            <Box sx={{ flexGrow: 1 }} />

            {/* mobile view menu button */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <Menu />
              </IconButton>
            </Box>

            {/* desktop menu */}
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

            {/* desktop login */}
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
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for mobile */}
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
              <ListItem key={page} disablePadding>
                <ListItemButton onClick={() => handleMenuButtons(page)}>
                  <ListItemText primary={page} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleLoginButton}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignupButton}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header_1;
